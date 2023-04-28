const express = require('express');
const weatherRouter = express.Router();
const axios = require('axios')

const apiPath = '/api/weather';

/*
    Get the weather for a specific location or default to College Station
    ignore my api key, it's not valid anymore
*/
weatherRouter.get(apiPath, async (req, res) => {
    const apiKey = 'b7b6de0697930af82c752d374be1837f';
    const lon = req.query.lon || -96.341508;
    const lat = req.query.lat || 30.612298;
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        res.send(response.data)
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = weatherRouter;