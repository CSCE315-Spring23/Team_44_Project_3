const express = require("express");
const app = express();
const path = require('path');

const port = 3001;

app.use(express.json())


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
});


module.exports = app;