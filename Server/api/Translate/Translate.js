const express = require('express');
// TODO: add the translate router when functionality is added
const translateRouter = express.Router();
const apiPath = '/api/translate';

translateRouter.get(apiPath, async (req, res) => {});

module.exports = translateRouter;