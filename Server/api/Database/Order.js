const express = require('express');
const orderRouter = express.Router();
const apiPath = "/api/order";
const db = require('./Info/DatabaseConnect.js');
const { ORDER_ITEM_DATABASE, MENU_ITEM_DATABASE, SOLD_ITEM_DATABASE } = require('./Info/DatabaseNames.js');

/*
    Query Database for Menu Items
    @param: None
    @return: JSON object with the format: list[{id: int, name: string, cost: string, numbersold: int}]
        ex: [ { "id": 5, "name": "Sandwich", "cost": "4.23", "numbersold": 2000 } ]
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
        console.log('hi!');
        console.log(req.body);
        const value = req.body.value;
        console.log(value);
        res.send('e');
    } catch (err) {
        console.log(err);
    }
});

module.exports = orderRouter;