const express = require('express');
const orderHistoryRouter = express.Router();
const db = require('./Info/DatabaseConnect.js');

const { ORDER_ITEM_DATABASE, MENU_ITEM_DATABASE, SOLD_ITEM_DATABASE } = require('./Info/DatabaseNames.js');

const api_path = "/api/orderhistory";

/*
    Get the last 30 orders

    /api/orderhistory/getOrders

    @return: JSON object with the following format:
    {
        "id": "number",
        "customer_name": "string",
        "total_cost": "number",
        "date": "string",
        "employee_id": "number"
    }
*/
orderHistoryRouter.get(api_path+"/getOrderHistory", async (req, res) => {
    try{
        const response = await db.query(`SELECT * FROM ${ORDER_ITEM_DATABASE} ORDER BY id DESC LIMIT 30`);
        res.send(response.rows);
    } catch(err){
        console.log(err);
    }
});


/*
    Get the order information for a specific order

    /api/orderhistory/getOrderInformation/?id=${id}

    @param: Order ID
    @return: JSON object with the following format:
    {
        "name": "string",
        "cost": "number",
        "totalSold": "number"
    }
*/
orderHistoryRouter.get(api_path+"/getOrderInformation/", async (req, res) => {
    try{
        const id = req.query.id;
        const response = await db.query(`SELECT ${MENU_ITEM_DATABASE}.name, ${MENU_ITEM_DATABASE}.cost, COUNT(*) as total_sold FROM ${SOLD_ITEM_DATABASE}
            JOIN ${MENU_ITEM_DATABASE} ON ${SOLD_ITEM_DATABASE}.menuid = ${MENU_ITEM_DATABASE}.id
            JOIN ${ORDER_ITEM_DATABASE} ON ${SOLD_ITEM_DATABASE}.orderid = ${ORDER_ITEM_DATABASE}.id
            WHERE ${ORDER_ITEM_DATABASE}.id = ${id} GROUP BY ${MENU_ITEM_DATABASE}.id`);

        res.send(response.rows);
    } catch(err){
        console.log(err);
    }
});


module.exports = orderHistoryRouter;

