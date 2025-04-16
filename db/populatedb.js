const { Client } = require("pg");
require('dotenv').config();

const SQL = `
    CREATE TABLE IF NOT EXISTS members (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR (255) NOT NULL,
        last_name VARCHAR (255) NOT NULL,
        username VARCHAR (255) NOT NULL,
        password VARCHAR (255) NOT NULL,
        status VARCHAR (255) NOT NULL,
        UNIQUE(username)
    );

    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        title VARCHAR (255) NOT NULL,
        message VARCHAR (255) NOT NULL,
        added DATE NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY(user_id)
            REFERENCES members(id)
            ON DELETE CASCADE
    );
`

async function main() {
    console.log("seeding...");
    const client = new Client({
        host: "localhost",
        user: "postgres",
        database: "members_db",
        password: process.env.USER_PASS,
        port: 5432
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();