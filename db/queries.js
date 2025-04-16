const pool = require("./pool");

async function insertUser(firstName, lastName, username, password, status) {
    let query = `
    INSERT INTO members (first_name, last_name, username, password, status)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `
    const values = [firstName, lastName, username, password, status];

    await pool.query(query, values);
}

async function searchUsername(username) {
    let query = `
        SELECT * FROM members 
        WHERE username = $1;
    `
    const { rows } = await pool.query(query, [username]);
    return rows;
}

async function searchID(id) {
    let query = `
        SELECT * FROM members
        WHERE id = $1;
    `

    const { rows } = await pool.query(query, [id]);
    return rows;
}

module.exports = {
    insertUser,
    searchUsername,
    searchID
}