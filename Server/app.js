const express = require("express");
const app = express();

const port = 3001;

app.use(express.json())


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    res.send("Starting Page");
});


module.exports = app;