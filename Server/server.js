const app = require("./app.js");

const orderhistory = require("./Database/OrderHistory/OrderHistory.js");

const port = 3001;

app.get("/", orderhistory);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

