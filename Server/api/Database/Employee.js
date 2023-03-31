const express = require('express');
const employeeRouter = express.Router();
const db = require('./Info/DatabaseConnect.js');

const EMPLOYEE_DATABASE = require('./Info/DatabaseNames.js').EMPLOYEE_DATABASE;
const api_path = "/api/employee";

/*
    Get all employees
    /api/employee/getEmployees

    @param: None
    @return: JSON object with the following format:
        {
            "id": "number",
            "name": "string",
            "role": "string",
            "pin": "string"
        }
*/
employeeRouter.get(api_path+"/getEmployees", async (req, res) => {
    try{
        const response = await db.query(`SELECT * FROM ${EMPLOYEE_DATABASE}`);
        res.send(response.rows);
    }catch(err){
        console.log(err);
    }
});

module.exports = employeeRouter;