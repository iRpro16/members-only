const { Pool } = require('pg');
require('dotenv').config();

module.exports = new Pool({
    host: "localhost",
    user: "postgres",
    database: "members_db",
    password: process.env.USER_PASS,
    port: 5432
});