const express = require('express');
const loginRouter = express.Router();
const apiPath = "/api/login";
const db = require('./Info/DatabaseConnect.js');

// checks if valid user
// returns user if valid
loginRouter.post(apiPath, async (req, res) => {
    
    const { name, email = '', pin = ''} = req.body;
    let isValidUser = false;
    let isManager = false;

    // check if user exists
    let response = await db.query(`SELECT * FROM employee WHERE ${pin !== '' ? `pin = '${pin}'` : `email = '${email}'`}`);
    isValidUser = response.rows.length > 0;
    isManager = isValidUser && response.rows[0].role === 'manager';
    console.log(isValidUser, isManager);

    res.send({ isValidUser, isManager });
});

module.exports = loginRouter;