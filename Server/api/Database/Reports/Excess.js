const express = require('express');
const excessRouter = express.Router();
const db = require('../Info/DatabaseConnect.js');

const { ORDER_ITEM_DATABASE, SOLD_ITEM_DATABASE, RECIPE_ITEM_DATABASE, INVENTORY_DATABASE } = require('../Info/DatabaseNames.js');
const apiPath = "/api/reports/excess";

/*
    grabs all inventory items that have been used less than 10% of their quantity

    /api/reports/excess?startDate={YYYY-MM-DD}&endDate={YYYY-MM-DD}

    @param startDate - Start date of the range to check in YYYY-MM-DD format
    @param endDate - End date of the range to check in YYYY-MM-DD format

    @return - json object with the following format:
    [
        {
            id: {id},
            name: {name},
            total_used: {total_used},
            quantity: {quantity},
            usage: {usage}
        },
        ...
    ]
*/
excessRouter.get(apiPath, async (req, res) => {
    try{
        console.log(req.query)
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        const usage = await getUsage(startDate, endDate);

        const response = await db.query(`SELECT * FROM ${INVENTORY_DATABASE} ORDER BY id`);
        const inventory = response.rows;

        let excess = [];
        for(let i = 0; i < inventory.length; i++){
            let item = inventory[i];
            let itemUsage = usage.find(x => x.id == item.id);

            if(itemUsage == null){
                itemUsage = { total_used: 0 };
            }

            if(itemUsage.total_used < item.quantity * .1){
                excess.push(
                    {
                        id: item.id,
                        name: item.name,
                        total_used: itemUsage.total_used,
                        quantity: item.quantity,
                        usage: (itemUsage.total_used / item.quantity).toFixed(6)
                    });
            }
        }
        console.log(excess);

        res.send(excess);


    } catch(err){
        console.log(err);
    }
});

// gets the total usage of each inventory item between the given dates
const getUsage = async (startDate, endDate) => {
    try{
        const response = await db.query(`SELECT i.id, i.name, SUM(r.count) AS total_used
        FROM ${ORDER_ITEM_DATABASE} o
        JOIN ${SOLD_ITEM_DATABASE} s ON o.id = s.orderid
        JOIN ${RECIPE_ITEM_DATABASE} r ON s.menuid = r.menuid
        JOIN ${INVENTORY_DATABASE} i ON r.inventoryid = i.id
        WHERE Date(o.date) >= '${startDate}' AND Date(o.date) <= '${endDate}'
        GROUP BY i.id, i.name
        ORDER BY i.id;`);

        return response.rows;
    } catch(err){
        console.log(err);
    }
}

module.exports = excessRouter;