const express = require('express');
const loginRouter = express.Router();
const apiPath = "/api/login";
const db = require('./Info/DatabaseConnect.js');

// checks if valid user
// returns user if valid
loginRouter.post(apiPath, async (req, res) => {
    
    const { email = '', pin = ''} = req.body;

    // grab user data from database
    let response = await db.query(`SELECT * FROM employee WHERE ${pin !== '' ? `pin = '${pin}'` : `email = '${email}'`}`);

    // construct response
    let isValidUser = response.rows.length > 0;
    let id = isValidUser && response.rows[0].id;
    let name = isValidUser && response.rows[0].name;
    let isManager = isValidUser && response.rows[0].role === 'manager';

    res.send({ isValidUser, id, name, isManager });
});

module.exports = loginRouter;