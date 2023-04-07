const express = require('express');
const restockRouter = express.Router();
const db = require('../Info/DatabaseConnect.js');


const { INVENTORY_DATABASE } = require('../Info/DatabaseNames.js');
const apiPath = "/api/reports/restock";



restockRouter.get(apiPath, async (req, res) => {
    try{
        const response = await db.query(`SELECT * FROM ${INVENTORY_DATABASE} WHERE quantity < threshold`);
        res.send(response.rows);
    } catch(err){
        console.log(err);
    }
});

module.exports = restockRouter;