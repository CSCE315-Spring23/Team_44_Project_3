const db = require('../Info/DatabaseConnect.js');

const EMPLOYEE_DATABASE = require('../Info/DatabaseNames.js').EMPLOYEE_DATABASE;

const getEmployees = (callback) => {
    db.query(`SELECT * FROM ${EMPLOYEE_DATABASE}`, [], (err, res) => {
        callback(res);
    });
}

module.exports = {
    getEmployees
};