const pool = require("./pool");

async function insertUser(firstName, lastName, username, password, status) {
    let query = `
    INSERT INTO members (first_name, last_name, username, password, status)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `
    const values = [firstName, lastName, username, password, status];

    await pool.query(query, values);
}

module.exports = {
    insertUser
}