const { Client } = require("pg");
require('dotenv').config();

const SQL = `
    CREATE TABLE IF NOT EXISTS members (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR (255),
        last_name VARCHAR (255),
        username VARCHAR (255),
        password VARCHAR (255),
        status VARCHAR (255)
    );

    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        user_id INT,
        message VARCHAR (255)
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