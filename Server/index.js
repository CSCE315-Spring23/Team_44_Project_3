const express = require('express');
const path = require('path');
const app = express();
const port = 3001;


// include database helper funcs
const orderHistoryFuncs = require("./Database/OrderHistory/OrderHistoryFunctions");

// connect to static react app
app.use(express.static(path.join(__dirname, '../Client/dist')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* here we will include any other app.get() endpoints that we keep in other files */

app.get('/api/getOrders', (req, res) => {
    orderHistoryFuncs.getOrders((result) => {
        res.send(result.rows);
    });
});

//catch all other routes and direct them to react
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
});

//serve app
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});