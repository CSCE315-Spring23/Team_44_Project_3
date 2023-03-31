const express = require('express');
const path = require('path');
const app = express();
const port = 3001;


// include database helper funcs
const orderRouter = require("./api/Database/Order.js");
const orderHistoryRouter = require("./api/Database/OrderHistory.js");
const employeeRouter = require("./api/Database/Employee.js");
const inventoryRouter = require("./api/Database/Inventory.js");
const weatherRouter = require("./api/Weather/Weather.js");


// connect to static react app
app.use(express.static(path.join(__dirname, '../Client/dist')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* here we will include any other app.get() endpoints that we keep in other files */

app.use('/', orderRouter);
app.use('/', orderHistoryRouter);
app.use('/', employeeRouter);
app.use('/', weatherRouter);
app.use('/', inventoryRouter);







//catch all other routes and direct them to react
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
});

//serve app
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = app;