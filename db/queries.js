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

async function upgradeStatus(username, status) {
    let query = `
        UPDATE members 
        SET status = $1
        WHERE username = $2;
    `

    const values = [status, username];
    const { rows } = await pool.query(query, values);
    return rows;
}

// try inner join
async function getAllMessages() {
    let query = `
        SELECT 
            members.username,
            messages.title,
            messages.message,
            messages.added,
            messages.id
        FROM members
        INNER JOIN messages
            ON members.id = messages.user_id;
    `
    const { rows } = await pool.query(query);
    return rows;
}

async function addMessage(title, message, user_id) {
    let query = `
        INSERT INTO messages (title, message, user_id)
        VALUES ($1, $2, $3) RETURNING *;
    `

    const values = [title, message, user_id];
    await pool.query(query, values);
}

async function deleteMessage(id) {
    let query = `
        DELETE FROM messages
        WHERE id = $1;
    `
    await pool.query(query, [id]);
}

module.exports = {
    insertUser,
    searchUsername,
    searchID,
    upgradeStatus,
    getAllMessages,
    addMessage,
    deleteMessage
}