const app = require("../../app.js");

const functions = require("./OrderHistoryFunctions.js");

app.get("/api/orderhistory/getOrders", (req, res) => {
    functions.getOrders((result) => {
        res.send(result.rows);
    });
});

module.exports = app;