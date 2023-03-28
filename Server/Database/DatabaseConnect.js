const username = require('./DatabaseLoginInfo').username;
const host = require('./DatabaseLoginInfo').host;
const database = require('./DatabaseLoginInfo').database;
const password = require('./DatabaseLoginInfo').password;

const { Pool } = require('pg');

const pool = new Pool({
    user: username,
    host: host,
    database: database,
    password:  password,
    port: 5432,
});

module.exports = {
    query: (text, params, callback) => pool.query(text, params, callback),
};