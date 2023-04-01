const express = require('express');
const orderRouter = express.Router();
const apiPath = "/api/order";
const db = require('./Info/DatabaseConnect.js');
const { ORDER_ITEM_DATABASE, MENU_ITEM_DATABASE, SOLD_ITEM_DATABASE, INVENTORY_DATABASE } = require('./Info/DatabaseNames.js');

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
    @param: JSON object: {customerName: string, totalCost: float OR string, employeeID: int, items: list[{id: int, quantity: int}]}
        ex: { "customerName": "John Doe", "totalCost": 12.34, "employeeID": 1, "items": [ { "id": 5, "quantity": 2 }, ... ] }
    @return: none
*/
orderRouter.post(apiPath + "/postOrder", async (req, res) => {
    try {
        // extract data
        const { customerName, totalCost, employeeID, items } = req.body;
        const currentDate = new Date();
        const formattedDateTime = currentDate.toISOString().replace('T', ' ').split('.')[0];

        // query next orderitem id
        let id = await db.query(`SELECT MAX(id) FROM ${ORDER_ITEM_DATABASE}`);
        id = id.rows[0].max + 1;

        // insert receipt into orderitem
        await db.query(`INSERT INTO ${ORDER_ITEM_DATABASE} VALUES (${id}, '${customerName}', '${totalCost}', '${formattedDateTime}', ${employeeID})`);

        res.status(200).send("Order Received");
    } catch (err) {
        console.log("CAUGHT ERROR: " + err);
        res.status(500).send("Error: " + err);
    }
});

module.exports = orderRouter;