const express = require('express');
const orderRouter = express.Router();
const apiPath = "/api/order";
const db = require('./Info/DatabaseConnect.js');
const { ORDER_ITEM_DATABASE, MENU_ITEM_DATABASE, SOLD_ITEM_DATABASE } = require('./Info/DatabaseNames.js');

/*
    Query Database for Menu Items
    @param: none
    @return: JSON object: list[{id: int, name: string, cost: string, numbersold: int}]
        ex: [ { "id": 5, "name": "Sandwich", "cost": "4.23", "numbersold": 2000 }, ... ]
*/
orderRouter.get(apiPath + "/getMenu", async (req, res) => {
    try {
        const response = db.query(`SELECT * FROM ${MENU_ITEM_DATABASE}`);
        console.log(response.rows);
        res.send(response.rows);
    } catch (err) {
        console.log(err);
    }
});

/*
    Send Order to Database
    @param: JSON object: {customerName: string, totalCost: float, employeeID: int, items: list[{id: int, quantity: int}]}
        ex: { "customerName": "John Doe", "totalCost": 12.34, "employeeID": 1, "items": [ { "id": 5, "quantity": 2 }, ... ] }
    @return: none
*/
orderRouter.post(apiPath + "/postOrder", async (req, res) => {
    try {
    } catch (err) {
        console.log(err);
    }
});

module.exports = orderRouter;