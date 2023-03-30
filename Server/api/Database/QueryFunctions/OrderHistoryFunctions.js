const { ORDER_ITEM_DATABASE, MENU_ITEM_DATABASE, SOLD_ITEM_DATABASE } = require('../Info/DatabaseNames.js');

const db = require('../Info/DatabaseConnect.js');

/*
    Get the last 30 orders

    @return: JSON object with the following format:
    {
        "id": "number",
        "customer_name": "string",
        "total_cost": "number",
        "date": "string",
        "employee_id": "number"
    }
*/
const getOrders = (callback) => {
    db.query(`SELECT * FROM ${ORDER_ITEM_DATABASE} ORDER BY date DESC LIMIT 30`, [], (err, res) => {
        callback(res);
    });
}


/*
    Get the order information for a specific order

    @param: Order ID
    @return: JSON object with the following format:
    {
        "name": "string",
        "cost": "number",
        "totalSold": "number"
    }
*/
const getOrderInformation = (callback, id) => {
    db.query(`SELECT ${MENU_ITEM_DATABASE}.name, ${MENU_ITEM_DATABASE}.cost, COUNT(*) as totalSold FROM ${SOLD_ITEM_DATABASE}
        JOIN ${MENU_ITEM_DATABASE} ON ${SOLD_ITEM_DATABASE}.menuid = ${MENU_ITEM_DATABASE}.id
        JOIN ${ORDER_ITEM_DATABASE} ON ${SOLD_ITEM_DATABASE}.orderid = ${ORDER_ITEM_DATABASE}.id
        WHERE ${ORDER_ITEM_DATABASE}.id = ${id} GROUP BY ${MENU_ITEM_DATABASE}.id`
        , [], (err, res) => {

        callback(res);
    });
}


module.exports = {
    getOrders,
    getOrderInformation
};