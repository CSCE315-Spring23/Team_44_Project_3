const express = require('express');
const db = require('./Info/DatabaseConnect.js');

const editMenuRouter = express.Router();

const { MENU_ITEM_DATABASE, RECIPE_ITEM_DATABASE } = require('./Info/DatabaseNames.js');

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
        const response = await db.query(`SELECT * FROM ${MENU_ITEM_DATABASE} ORDER BY id`);
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
    @param: recipeItems - "array" of recipe ids

    @return: None
*/
editMenuRouter.put(apiPath + "/updateMenuItem", async (req, res) => {
    try {
        console.log(req.body)
        const { id, name, cost, recipeItems } = req.body;
        await db.query(`UPDATE ${MENU_ITEM_DATABASE} SET name = \'${name}\', cost = ${cost} WHERE id = ${id}`);
        console.log("updated menu item")
        // Delete all recipe items associated with this menu item
        await db.query(`DELETE FROM ${RECIPE_ITEM_DATABASE} WHERE menuid = ${id}`);
        console.log("deleted recipe items")
        // Add all recipe items associated with this menu item
        const recipeItemMap = new Map();
        recipeItems.forEach((item) => {
            if (recipeItemMap.has(item.id)) {
                recipeItemMap.set(item.id, recipeItemMap.get(item.id) + 1);
            } else {
                recipeItemMap.set(item.id, 1);
            }
        });
        console.log(recipeItemMap)
        recipeItemMap.forEach(async (value, key) => {
            const lastid = await db.query(`SELECT MAX(id) FROM ${RECIPE_ITEM_DATABASE}`);
            const newid = lastid.rows[0].max + 1;
            await db.query(`INSERT INTO ${RECIPE_ITEM_DATABASE} (id, inventoryid, menuid, count) VALUES (${newid}, ${key}, ${id}, ${value})`);
        });


        res.status(200).json({ message: "Successfully updated menu item" });
    } catch (err) {
        res.status(500).json({ message: "Error updating menu item" });
    }
});

module.exports = editMenuRouter;