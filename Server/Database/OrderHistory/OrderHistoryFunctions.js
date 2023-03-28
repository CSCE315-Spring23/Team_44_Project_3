const ORDER_ITEM_DATABASE = require('../DatabaseNames.js').ORDER_ITEM_DATABASE;

const db = require('../DatabaseConnect.js');

function getOrders(callback) {
    db.query('SELECT * FROM ' + ORDER_ITEM_DATABASE + ' ORDER BY id DESC LIMIT 30', [], (err, res) => {
        callback(res);
    });
}

module.exports = {
    getOrders,
};