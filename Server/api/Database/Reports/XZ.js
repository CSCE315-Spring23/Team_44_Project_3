const express = require('express');
const XZRouter = express.Router();
const db = require('../Info/DatabaseConnect.js');


const { ORDER_ITEM_DATABASE, SOLD_ITEM_DATABASE, MENU_ITEM_DATABASE, INVENTORY_DATABASE, RECIPE_ITEM_DATABASE, ZREPORT_DATABASE, EMPLOYEE_DATABASE} = require('../Info/DatabaseNames.js');
const apiPath = "/api/reports/XZ";


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

XZRouter.get(apiPath + "/getZReports", async (req, res) => {
    try{
        const response = await db.query(`SELECT * FROM ${ZREPORT_DATABASE} ORDER BY reportid`);
        res.send(response.rows);
    } catch(err){
        console.log(err);
    }
});

XZRouter.get(apiPath + "/getZReportInfo", async (req, res) => {
    try{
        const id = req.query.id;

        const response = await db.query(`SELECT * FROM ${ZREPORT_DATABASE} WHERE reportid = ${id}`);
        res.send(response.rows[0]);

    } catch(err){
        console.log(err);
    }
});

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

const getLastZReport = async () => {
    try{
        const response = await db.query(`SELECT * FROM ${ZREPORT_DATABASE} ORDER BY reportid DESC LIMIT 1`);
        return response.rows[0];
    }
    catch(err){
        console.log(err);
    }
}

const getEmployee = async (employeeID) => {
    try{
        const response = await db.query(`SELECT * FROM ${EMPLOYEE_DATABASE} WHERE id = ${employeeID}`);
        return response.rows[0];
    }
    catch(err){
        console.log(err);
    }
}

const getLastOrderID = async () => {
    try{
        const response = await db.query(`SELECT id FROM ${ORDER_ITEM_DATABASE} ORDER BY id DESC LIMIT 1`);
        return response.rows[0].id;
    }
    catch(err){
        console.log(err);
    }
}


const currentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
















module.exports = XZRouter;
