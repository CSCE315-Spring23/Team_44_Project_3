const ORDER_ITEM_DATABASE = require('../DatabaseNames.js').ORDER_ITEM_DATABASE;
const MENU_ITEM_DATABASE = require('../DatabaseNames.js').MENU_ITEM_DATABASE;
const SOLD_ITEM_DATABASE = require('../DatabaseNames.js').SOLD_ITEM_DATABASE;

const db = require('../DatabaseConnect.js');

// Get the last 30 orders
function getOrders(callback) {
    db.query('SELECT * FROM ' + ORDER_ITEM_DATABASE + ' ORDER BY id DESC LIMIT 30', [], (err, res) => {
        callback(res);
    });
}

function getOrderInformation(callback, id) {

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