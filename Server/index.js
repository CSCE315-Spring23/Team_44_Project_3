const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

const orderHistoryFuncs = require("./Database/OrderHistory/OrderHistoryFunctions");

app.use(express.static(path.join(__dirname, '../Client/dist')));

app.get('/api/getOrders', (req, res) => {
    orderHistoryFuncs.getOrders((result) => {
        res.send(result.rows);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});