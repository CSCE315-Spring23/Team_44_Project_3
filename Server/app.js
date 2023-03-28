const express = require("express");
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../Client/dist')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
// });


module.exports = app;