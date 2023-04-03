const express = require('express');
const db = require('./Info/DatabaseConnect.js');

const editMenuRouter = express.Router();

const { MENU_ITEM_DATABASE, RECIPE_ITEM_DATABASE, INVENTORY_DATABASE } = require('./Info/DatabaseNames.js');

const apiPath = "/api/editMenu";


/*
    Get all menu items from the menu database.

    /api/editMenu/getMenu

    @param: None
    @return: Json object in the following format:
    {
        "id": "number",
        "name": "string",
        "price": "number",
        "numbersold": "number"
    }
*/
//TODO: probably will include a "category" field in the future
editMenuRouter.get(apiPath + "/getMenu", async (req, res) => {
    try {
        const response = await db.query(`SELECT id, name, cost, numbersold as number_sold FROM ${MENU_ITEM_DATABASE} ORDER BY id`);
        res.status(200).json(response.rows);
    } catch (err) {
        res.status(500).json({ message: "Error getting menu" });
    }
});


/*
    Edit a menu item in the menu database.

    /api/editMenu/updateMenuItem

    @param: id - "number"
    @param: name - "string"
    @param: cost - "number"
    @param: recipeItems - json "array" of recipe ids

    @return: None
*/
editMenuRouter.put(apiPath + "/updateMenuItem", async (req, res) => {
    try {
        const { id, name, cost, recipeItems } = req.body;
        await db.query(`UPDATE ${MENU_ITEM_DATABASE} SET name = \'${name}\', cost = ${cost} WHERE id = ${id}`);

        // Delete all recipe items associated with this menu item
        await deleteRecipeItems(id);

        // Add all recipe items associated with this menu item
        await addRecipeItems(id, recipeItems);

        res.status(200).json({ message: "Successfully updated menu item" });
    } catch (err) {
        res.status(500).json({ message: "Error updating menu item" });
    }
});


/*
    Delete a menu item from the menu database.

    /api/editMenu/deleteMenuItem

    @param: id - "number"

    @return: None
*/
editMenuRouter.delete(apiPath + "/deleteMenuItem", async (req, res) => {
    try {
        const id = req.body.id;
        await db.query(`DELETE FROM ${MENU_ITEM_DATABASE} WHERE id = ${id}`);

        // Delete all recipe items associated with this menu item
        await deleteRecipeItems(id);

        res.status(200).json({ message: "Successfully deleted menu item" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting menu item" });
    }
});


/*
    Add a menu item to the menu database.

    /api/editMenu/insertMenuItem

    @param: name - "string"
    @param: cost - "number"
    @param: recipeItems - json "array" of recipe ids

    @return: None
*/
editMenuRouter.post(apiPath + "/insertMenuItem", async (req, res) => {
    try {
        const { name, cost, recipeItems } = req.body;
        const lastid = await db.query(`SELECT MAX(id) FROM ${MENU_ITEM_DATABASE}`);
        const newid = lastid.rows[0].max + 1;

        // check if inventory items don't exist
        const recipeItemMap = new Map();
        recipeItems.forEach((item) => {
            if (recipeItemMap.has(item.id)) {
                recipeItemMap.set(item.id, recipeItemMap.get(item.id) + 1);
            } else {
                recipeItemMap.set(item.id, 1);
            }
        });

        recipeItemMap.forEach(async (value, key) => {
            const inventoryItem = await db.query(`SELECT * FROM ${INVENTORY_DATABASE} WHERE id = ${key}`);
            if (inventoryItem.rows.length === 0) {
                res.status(500).json({ message: "Error adding menu item" });
                return;
            }
        });

        await db.query(`INSERT INTO ${MENU_ITEM_DATABASE} (id, name, cost, numbersold) VALUES (${newid}, \'${name}\', ${cost}, 0)`);

        await addRecipeItems(newid, recipeItems);

        res.status(200).json({ message: "Successfully added menu item" });
    } catch (err) {
        res.status(500).json({ message: "Error adding menu item" });
    }
});

// helper functions

// Deletes all recipe items associated with a menu item
const deleteRecipeItems = async (id) => {
    try {
        await db.query(`DELETE FROM ${RECIPE_ITEM_DATABASE} WHERE menuid = ${id}`);
    } catch (err) {
        console.log("Error deleting menu item");
    }
}

const addRecipeItems = async (id, recipeItems) => {
    try {
        const recipeItemMap = new Map();
        recipeItems.forEach((item) => {
            if (recipeItemMap.has(item.id)) {
                recipeItemMap.set(item.id, recipeItemMap.get(item.id) + 1);
            } else {
                recipeItemMap.set(item.id, 1);
            }
        });
        const lastid = await db.query(`SELECT MAX(id) FROM ${RECIPE_ITEM_DATABASE}`);
        let newid = lastid.rows[0].max + 1;
        recipeItemMap.forEach(async (value, key) => {
            await db.query(`INSERT INTO ${RECIPE_ITEM_DATABASE} (id, inventoryid, menuid, count) VALUES (${newid++}, ${key}, ${id}, ${value})`);
        });
    } catch (err) {
        console.log("Error adding recipe items");
    }
}

module.exports = editMenuRouter;