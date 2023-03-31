const express = require('express');
const db = require('./Info/DatabaseConnect.js');
const inventoryRouter = express.Router();

const INVENTORY_DATABASE = require('./Info/DatabaseNames.js').INVENTORY_DATABASE;

const apiPath = "/api/inventory";

/*
    insert an item into the inventory database.

    /api/inventory/insertInventoryItem/?name={NAME}&quantity={QUANTITY}

    @param: name - name of the item
    @param: quantity - quantity of the item
    @return: None
*/
inventoryRouter.post(apiPath+"/insertInventoryItem", async (req, res) => {
    try{
        console.log(req.body)
        const name = req.body.name;
        const quantity = req.body.quantity;

        const lastid = await db.query(`SELECT MAX(id) FROM ${INVENTORY_DATABASE}`);
        const id = lastid.rows[0].max + 1;
        const response = await db.query(`INSERT INTO ${INVENTORY_DATABASE} (id, name, quantity, threshold) VALUES (${id}, '${name}', ${quantity}, 50)`);

        res.status(200).json({message: `Item ${id}: ${name} inserted successfully`});
    } catch(err){
        res.status(500).json({message: "Error inserting item into inventory database"});
    }
});

/*
    This endpoint is used to delete an item from the inventory database.

    /api/inventory/deleteInventoryItem/?id={ID}

    @param: id - id of the item to delete
    @return: None
*/
inventoryRouter.delete(apiPath+"/deleteInventoryItem", async (req, res) => {
    try{
        console.log(req.body)
        const id = req.body.id;

        const response = await db.query(`DELETE FROM ${INVENTORY_DATABASE} WHERE id = ${id}`, (err, res) => {
            if(err){
                console.log(err);
            }
        });
        res.status(200).json({message: `Item ${id} deleted successfully`});
    } catch(err){
        res.status(500).json({message: "Error deleting item from inventory database"});
    }
});


/*
    Get all inventory items from the inventory database.

    /api/inventory/getInventory

    @param: None
    @return: Json object in the following format:
    {
        "id": "number",
        "name": "string",
        "quantity": "number",
        "threshold": "number"
    }
*/
inventoryRouter.get(apiPath+"/getInventory", async (req, res) => {
    try{
        const response = await db.query(`SELECT * FROM ${INVENTORY_DATABASE} ORDER BY id`);
        res.status(200).json(response.rows.splice(1));
    } catch(err){
        res.status(500).json({message: "Error getting inventory"});
    }
});


inventoryRouter.put(apiPath+"/updateInventoryItem", async (req, res) => {
    try{
        console.log(req.body)
        const id = req.body.id;
        const quantity = req.body.quantity;
        const prevQuant = await db.query(`SELECT quantity FROM ${INVENTORY_DATABASE} WHERE id = ${id}`);
        const quant = prevQuant.rows[0].quantity;

        if(quant === 0){
            res.status(500).json({message: "Cannot update item with 0 quantity"});
            return;
        }

        const response = await db.query(`UPDATE ${INVENTORY_DATABASE} SET quantity = ${quantity} WHERE id = ${id}`);
        res.status(200).json({message: `Item ${id} updated successfully`});
    } catch(err){
        res.status(500).json({message: "Error updating inventory item"});
    }
});




module.exports = inventoryRouter;