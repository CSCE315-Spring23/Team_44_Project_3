const express = require("express");

const app = express();
const port = 3001;

const test = require("./Database/OrderQueries/test.js");

app.use(express.json())


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


app.get("/orderhistory/getOrders", (req, res) => {
    test.getOrders((data) => {
        res.send(data.rows);
    });
});
