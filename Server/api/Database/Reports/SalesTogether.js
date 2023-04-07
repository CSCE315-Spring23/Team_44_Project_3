const express = require('express');
const salesTogetherRouter = express.Router();
const db = require('../Info/DatabaseConnect.js');


const { ORDER_ITEM_DATABASE, SOLD_ITEM_DATABASE, MENU_ITEM_DATABASE, INVENTORY_DATABASE, RECIPE_ITEM_DATABASE} = require('../Info/DatabaseNames.js');
const apiPath = "/api/reports/salesTogether";



/*
    Gets the menu items that are sold together the most

    /api/reports/salesTogether/?startDate={YYYY-MM-DD}&endDate={YYYY-MM-DD}

    @param startDate: String, the start date of the report
    @param endDate: String, the end date of the report

    @return: JSON object, the menu items that are sold together the most
        e.g. {
            0: {
                menu_item_1: "Menu Item 1",
                menu_item_2: "Menu Item 2",
                number_sold: 10
            },
            1: { ... }
*/
salesTogetherRouter.get(apiPath, async (req, res) => {
    try{
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        const response = await db.query(`SELECT mi1.name as menu_item_1, mi2.name as menu_item_2, COUNT(DISTINCT si1.orderid) AS number_sold
            FROM ${SOLD_ITEM_DATABASE} si1
            JOIN ${SOLD_ITEM_DATABASE} si2 ON si1.orderid = si2.orderid AND si1.menuid < si2.menuid
            JOIN ${MENU_ITEM_DATABASE} mi1 ON si1.menuid = mi1.id
            JOIN ${MENU_ITEM_DATABASE} mi2 ON si2.menuid = mi2.id
            JOIN ${ORDER_ITEM_DATABASE} oi ON si1.orderid = oi.id
            WHERE Date(oi.date) >= '${startDate}' AND Date(oi.date) <= '${endDate}'
            AND mi1.id != mi2.id GROUP BY mi1.name, mi2.name ORDER BY number_sold DESC`);

        res.send(response.rows);
    } catch(err){
        console.log(err);
    }
});

module.exports = salesTogetherRouter;