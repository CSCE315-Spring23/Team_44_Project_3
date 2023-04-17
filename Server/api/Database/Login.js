const express = require('express');
const loginRouter = express.Router();
const apiPath = "/api/login";
const db = require('./Info/DatabaseConnect.js');

// checks if valid user
// returns user if valid
loginRouter.post(apiPath + "/", async (req, res) => {
    
    const { name, email = '', pin = ''} = req.body;
    let isValidUser = false;
    let isManager = false;

    // check if user exists
    if (pin !== '') {
        let response = await db.query(`SELECT EXISTS (SELECT 1 FROM employee WHERE pin = '${pin}')`)
        console.log(response);
    } else {
        let response = await db.query(`SELECT EXISTS (SELECT 1 FROM employee WHERE email = '${email}')`)
        console.log(response);
    }
    

    res.send({ isValidUser, isManager });
});

module.exports = loginRouter;