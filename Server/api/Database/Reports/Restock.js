const express = require('express');
const restockRouter = express.Router();
const db = require('../Info/DatabaseConnect.js');


const { INVENTORY_DATABASE } = require('../Info/DatabaseNames.js');
const apiPath = "/api/reports/restock";


/*
    Gets the inventory items that need to be restocked

    /api/reports/restock

    @return: JSON object, the inventory items that need to be restocked
        e.g. {
            0: {
                name: "Inventory Item",
                quantity: 10,
                threshold: 20
            },
            1: { ... }
*/
restockRouter.get(apiPath, async (req, res) => {
    try{
        const response = await db.query(`SELECT * FROM ${INVENTORY_DATABASE} WHERE quantity < threshold`);
        res.send(response.rows);
    } catch(err){
        console.log(err);
    }
});

module.exports = restockRouter;