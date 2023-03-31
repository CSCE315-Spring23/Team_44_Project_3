const express = require('express');
const orderRouter = express.Router();
const apiPath = "/api/order";
const db = require('./Info/DatabaseConnect.js');
const { ORDER_ITEM_DATABASE, MENU_ITEM_DATABASE, SOLD_ITEM_DATABASE } = require('./Info/DatabaseNames.js');

/*
    Query Database for Menu Items
    @param: None
    @return: Something
*/
orderRouter.get(apiPath + "/getMenu", async (req, res) => {
    console.log('hello there!');
    try {
        const response = await db.query(`SELECT * FROM ${MENU_ITEM_DATABASE}`);
        console.log(response.rows);
        res.send(response.rows);
    } catch (err) {
        console.log(err);
    }
});

orderRouter.post(apiPath + "/postOrder", async (req, res) => {
    try {
        const { customer_name, employee_id, items } = req.body;
    } catch (err) {
        console.log(err);
    }
});

module.exports = orderRouter;