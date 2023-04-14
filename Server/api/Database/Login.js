const express = require('express');
const loginRouter = express.Router();
const apiPath = "/api/login";

loginRouter.post(apiPath + "/", async (req, res) => {
    console.log(req.body);
    res.send('nice');
});

module.exports = loginRouter;