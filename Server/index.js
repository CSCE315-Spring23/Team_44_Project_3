const express = require('express');
const path = require('path');
const app = express();
const port = 3001;


// include database helper funcs
const orderHistoryRouter = require("./api/Database/OrderHistory.js");
const weatherRouter = require("./api/Weather/Weather.js");


// connect to static react app
app.use(express.static(path.join(__dirname, '../Client/dist')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* here we will include any other app.get() endpoints that we keep in other files */

app.use('/', orderHistoryRouter);
app.use('/', weatherRouter);







//catch all other routes and direct them to react
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
});

//serve app
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = app;