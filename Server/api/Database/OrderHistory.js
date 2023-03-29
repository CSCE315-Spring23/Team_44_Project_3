const express = require('express');
const orderHistoryRouter = express.Router();

const functions = require("./QueryFunctions/OrderHistoryFunctions.js");

const api_path = "/api/orderhistory";


orderHistoryRouter.get(api_path+"/getOrders", (req, res) => {
    functions.getOrders((result) => {
        res.send(result.rows);
    });
});

orderHistoryRouter.get(api_path+"/getOrderInformation/", (req, res) => {
    functions.getOrderInformation((result) => {
        res.send(result.rows);
    }, req.query.id);
});


module.exports = orderHistoryRouter;

