const app = require("../../app.js");

const functions = require("./OrderHistoryFunctions.js");

const api_path = "/api/orderhistory";

app.get(api_path+"/getOrders", (req, res) => {
    functions.getOrders((result) => {
        res.send(result.rows);
    });
});

app.get(api_path+"/getOrderInformation/:id", (req, res) => {
    functions.getOrderInformation((result) => {
        res.send(result.rows);
    }, req.params.id);
});

module.exports = app;