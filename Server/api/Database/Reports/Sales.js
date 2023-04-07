const express = require('express');
const salesRouter = express.Router();
const db = require('../Info/DatabaseConnect.js');


const { ORDER_ITEM_DATABASE, SOLD_ITEM_DATABASE, MENU_ITEM_DATABASE, INVENTORY_DATABASE, RECIPE_ITEM_DATABASE} = require('../Info/DatabaseNames.js');
const apiPath = "/api/reports/sales";




salesRouter.get(apiPath + "/getSales", async (req, res) => {
    try{
        console.log(req.query)
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        console.log(startDate);
        console.log(endDate);
        const response = await db.query(`SELECT name, count(*) AS number_sold FROM ${ORDER_ITEM_DATABASE}
            JOIN ${SOLD_ITEM_DATABASE} ON ${ORDER_ITEM_DATABASE}.id = ${SOLD_ITEM_DATABASE}.orderid
            JOIN ${MENU_ITEM_DATABASE} ON ${SOLD_ITEM_DATABASE}.menuid = ${MENU_ITEM_DATABASE}.id
            WHERE Date(${ORDER_ITEM_DATABASE}.date) >= '${startDate}' AND Date(${ORDER_ITEM_DATABASE}.date) <= '${endDate}'
            GROUP BY name ORDER BY number_sold DESC`);
        res.send(response.rows);
    }
    catch(err){
        console.log(err);
    }
});


salesRouter.get(apiPath + "/getInventorySales", async (req, res) => {
    try{
        console.log(req.query)
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        console.log(startDate);
        console.log(endDate);
        const response = await db.query(`SELECT ${INVENTORY_DATABASE}.name, SUM(${RECIPE_ITEM_DATABASE}.count) AS number_sold
            FROM ${ORDER_ITEM_DATABASE}
            JOIN ${SOLD_ITEM_DATABASE} ON ${ORDER_ITEM_DATABASE}.id = ${SOLD_ITEM_DATABASE}.orderid
            JOIN ${MENU_ITEM_DATABASE} ON ${SOLD_ITEM_DATABASE}.menuid = ${MENU_ITEM_DATABASE}.id
            JOIN ${RECIPE_ITEM_DATABASE} ON ${MENU_ITEM_DATABASE}.id = ${RECIPE_ITEM_DATABASE}.menuid
            JOIN inventory ON ${RECIPE_ITEM_DATABASE}.inventoryid = ${INVENTORY_DATABASE}.id
            WHERE Date(${ORDER_ITEM_DATABASE}.date) >= '${startDate}' AND Date(${ORDER_ITEM_DATABASE}.date) <= '${endDate}'
            GROUP BY ${INVENTORY_DATABASE}.id, ${INVENTORY_DATABASE}.name`);


        const togoBags = await db.query(`SELECT COUNT(*) AS order_count
            FROM ${ORDER_ITEM_DATABASE}
            WHERE Date(${ORDER_ITEM_DATABASE}.date) >= '${startDate}' AND Date(${ORDER_ITEM_DATABASE}.date) <= '${endDate}'
            `);

        // add togo bags to inventory sales
        response.rows.push({
            name: "To-Go Bags",
            number_sold: togoBags.rows[0].order_count
        });
        res.send(response.rows);
    } catch(err){
        console.log(err);
    }
});

module.exports = salesRouter;