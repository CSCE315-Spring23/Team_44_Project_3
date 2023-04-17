const express = require('express');
const loginRouter = express.Router();
const apiPath = "/api/login";

// checks if valid user
// returns user if valid
loginRouter.post(apiPath + "/", async (req, res) => {
    
    const { name, email = '', pin = ''} = req.body;
    let isValidUser = false;
    let isManager = false;

    // check if user exists
    if (pin !== '') {

    } else {

    }

    res.send({ isValidUser, isManager });
});

module.exports = loginRouter;