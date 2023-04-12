const express = require('express');
const orderRouter = express.Router();
const apiPath = "/api/order";
const db = require('./Info/DatabaseConnect.js');
const { ORDER_ITEM_DATABASE, MENU_ITEM_DATABASE, SOLD_ITEM_DATABASE, INVENTORY_DATABASE, RECIPE_ITEM_DATABASE } = require('./Info/DatabaseNames.js');

/*
    Query Database for Menu Items
    @param: none
    @return: list of JSON objects (menu items)
        ex: [
                {
                    id: 5, 
                    name: "Sandwich", 
                    cost: "4.23", 
                    numbersold: 2000 
                }, ...
            ]
*/
orderRouter.get(apiPath + "/getMenu", async (req, res) => {
    try {
        const response = await db.query(`SELECT * FROM ${MENU_ITEM_DATABASE} ORDER BY ID`);
        res.send(response.rows);
    } catch (err) {
        console.log(err);
    }
});

/*
    Send Order to Database
    @param: stringified JSON object
        ex: {
            customerName: "John Doe",
            totalCost: "12.34",
            employeeID: 1,
            items: [ {"id": 1, "quantity": 2}, ... ]
        }
    @return: none
*/
// TODO: add to solditem, update menuitem count, update inventory count
orderRouter.post(apiPath + "/postOrder", async (req, res) => {
    try {
        // extract data
        const { customerName, totalCost, employeeID, items } = req.body;
        const currentDate = new Date();
        const formattedDateTime = currentDate.toISOString().replace('T', ' ').split('.')[0];

        // query next orderitem id
        let orderId = await db.query(`SELECT MAX(id) FROM ${ORDER_ITEM_DATABASE}`);
        orderId = orderId.rows[0].max + 1;

        // insert receipt into orderitem
        await db.query(`INSERT INTO ${ORDER_ITEM_DATABASE} VALUES (${orderId}, '${customerName}', '${totalCost}', '${formattedDateTime}', ${employeeID})`);
        
        // grab next ids
        let response = await db.query(`SELECT MAX(id) FROM ${SOLD_ITEM_DATABASE}`);
        let solditemId = response.rows[0].max + 1;


        // update other 3 tables
        items.forEach((item) => {
            // insert items into solditem
            for (let i = 0; i < item.quantity; i++) {
                db.query(`INSERT INTO ${SOLD_ITEM_DATABASE} (id, menuid, orderid) VALUES (${solditemId}, ${item.id}, ${orderId})`);
                solditemId++;
            }

            // update menuitem count
            db.query(`UPDATE ${MENU_ITEM_DATABASE} SET numbersold = numbersold + ${item.quantity} WHERE id = ${item.id}`)

            // update inventory count
            db.query(`UPDATE ${INVENTORY_DATABASE} SET quantity = quantity -
            (SELECT ${RECIPE_ITEM_DATABASE}.count
                FROM ${RECIPE_ITEM_DATABASE}
                WHERE ${RECIPE_ITEM_DATABASE}.menuid = ${item.id}
                AND ${RECIPE_ITEM_DATABASE}.inventoryid = ${INVENTORY_DATABASE}.id
            )
            WHERE ${INVENTORY_DATABASE}.id IN
            (SELECT ${RECIPE_ITEM_DATABASE}.inventoryid
                FROM ${RECIPE_ITEM_DATABASE}
                WHERE ${RECIPE_ITEM_DATABASE}.menuid = ${item.id})`)
        },
        // TOGO bag
        await db.query(`UPDATE ${INVENTORY_DATABASE} SET quantity = quantity - 1 WHERE id = 1`)

        );

        

        res.status(200).send("Order Received");
    } catch (err) {
        console.log("CAUGHT ERROR: " + err);
        res.status(500).send("Error: " + err);
    }
});

module.exports = orderRouter;