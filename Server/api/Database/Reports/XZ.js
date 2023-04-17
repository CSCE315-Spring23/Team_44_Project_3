const express = require('express');
const XZRouter = express.Router();
const db = require('../Info/DatabaseConnect.js');


const { ORDER_ITEM_DATABASE, ZREPORT_DATABASE, EMPLOYEE_DATABASE } = require('../Info/DatabaseNames.js');
const apiPath = "/api/reports/XZ";

/*
    gets the X report since the last Z report

    /api/reports/XZ/getXReport?employeeid={employeeid}

    @param employeeid - id of the employee who is requesting the report

    @return - json object with the following format:
    {
        totalSales: {totalSales},
        employeeName: {employeeName},
        orderID: {orderID},
        date: {date}
    }
*/
XZRouter.get(apiPath + "/getXReport", async (req, res) => {
    try{
        let totalSales = await getTotalSalesSinceZReport();
        if(totalSales == null) totalSales = 0;
        const employee = await getEmployee(req.query.employeeid);
        const employeeName = employee.name;

        const date = currentDate();
        const orderID = await getLastOrderID();

        res.send({ totalSales, employeeName, orderID, date })
    } catch(err){
        console.log(err);
    }
});


/*
    gets the all Z reports

    /api/reports/XZ/getZReports

    @return - json object with the following format:
    [
        {
            reportid: {reportid},
            totalsales: {totalsales},
            employee: {employee},
            orderid: {orderid},
            datecreated: {datecreated}
        },
        ...
    ]
*/
XZRouter.get(apiPath + "/getZReports", async (req, res) => {
    try{
        const response = await db.query(`SELECT reportid as id, totalsales as total_sales, employee, orderid as order_id, datecreated as date_created FROM ${ZREPORT_DATABASE} ORDER BY reportid`);
        res.send(response.rows);
    } catch(err){
        console.log(err);
    }
});


/*
    gets the Z report info with the given id

    /api/reports/XZ/getZReportInfo?id={id}

    @param id - id of the Z report to get

    @return - json object with the following format:
    {
        reportid: {reportid},
        totalsales: {totalsales},
        employee: {employee},
        orderid: {orderid},
        datecreated: {datecreated}
    }
*/
XZRouter.get(apiPath + "/getZReportInfo", async (req, res) => {
    try{
        const id = req.query.id;

        const response = await db.query(`SELECT * FROM ${ZREPORT_DATABASE} WHERE reportid = ${id}`);
        res.send(response.rows[0]);

    } catch(err){
        console.log(err);
    }
});


/*
    creates a new Z report

    /api/reports/XZ/createZReport

    @param employeeid - id of the employee who is creating the report
*/
XZRouter.post(apiPath + "/createZReport", async (req, res) => {
    try{
        console.log(req.body)
        const employeeID = req.body.employeeid;
        const employee = await getEmployee(employeeID);
        const employeeName = employee.name;

        const orderID = await getLastOrderID();

        const date = currentDate();

        let totalSales = await getTotalSalesSinceZReport();
        if(totalSales == null) totalSales = 0;

        db.query(`INSERT INTO ${ZREPORT_DATABASE} (totalsales, employee, orderid, datecreated)
            VALUES (${totalSales}, '${employeeName}', ${orderID}, '${date}')`);

        res.send({ totalSales, employeeName, orderID, date });
    } catch(err){
        console.log(err);
    }
});

// helper functions

// gets the total sales since the last Z report
const getTotalSalesSinceZReport = async () => {
    try{
        const lastZReport = await getLastZReport();

        const prevOrderID = lastZReport.orderid;

        const totalSales = await db.query(`SELECT SUM(total_cost) FROM ${ORDER_ITEM_DATABASE} WHERE id > ${prevOrderID}`);
        return totalSales.rows[0].sum;
    } catch(err){
        console.log(err);
    }
}

// gets the last Z report
const getLastZReport = async () => {
    try{
        const response = await db.query(`SELECT * FROM ${ZREPORT_DATABASE} ORDER BY reportid DESC LIMIT 1`);
        return response.rows[0];
    }
    catch(err){
        console.log(err);
    }
}

// gets the employee name with the given id
const getEmployee = async (employeeID) => {
    try{
        const response = await db.query(`SELECT * FROM ${EMPLOYEE_DATABASE} WHERE id = ${employeeID}`);
        return response.rows[0];
    }
    catch(err){
        console.log(err);
    }
}

// gets the last order id
const getLastOrderID = async () => {
    try{
        const response = await db.query(`SELECT id FROM ${ORDER_ITEM_DATABASE} ORDER BY id DESC LIMIT 1`);
        return response.rows[0].id;
    }
    catch(err){
        console.log(err);
    }
}

// gets the current date in the format YYYY-MM-DD
const currentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
















module.exports = XZRouter;
