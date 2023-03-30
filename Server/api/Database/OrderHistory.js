const express = require('express');
const orderHistoryRouter = express.Router();

const functions = require("./QueryFunctions/OrderHistoryFunctions.js");

const api_path = "/api/orderhistory";

/*
    Get the last 30 orders
    /api/orderhistory/getOrders
*/
orderHistoryRouter.get(api_path+"/getOrders", (req, res) => {
    functions.getOrders((result) => {
        res.send(result.rows);
    });                           
});


/*
    Get the order information for a specific order
    /api/orderhistory/getOrderInformation?id=${id}
*/
orderHistoryRouter.get(api_path+"/getOrderInformation/", (req, res) => {
    functions.getOrderInformation((result) => {
        res.send(result.rows);
    }, req.query.id);
});


module.exports = orderHistoryRouter;

