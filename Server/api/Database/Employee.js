const express = require('express');
const employeeRouter = express.Router();

const functions = require("./QueryFunctions/EmployeeFunctions.js");

const api_path = "/api/employee";

/*
    Get all employees
    /api/employee/getEmployees
*/
employeeRouter.get(api_path+"/getEmployees", (req, res) => {
    functions.getEmployees((result) => {
        res.send(result.rows);
    });                           
});

module.exports = employeeRouter;