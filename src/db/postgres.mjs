import postgres from "postgres";
import { deepStrictEqual } from "assert";
import { describe, it } from "node:test";

const sql = postgres('postgres://postgres:mysecretpassword@localhost:5432/localdb');

// await sql`DROP TABLE IF EXISTS users`
// await sql`CREATE TABLE IF NOT EXISTS users (id serial, name text, email text)`;
// await sql`INSERT INTO users (name, email) VALUES ('John', 'john.fresco@gmail.com')`;
// const users = await sql`SELECT * FROM users`;
// await sql.end();

describe("postgres", () => {
    it("create a table", async() => {
        await sql`DROP TABLE IF EXISTS users`
        await sql`CREATE TABLE IF NOT EXISTS users (id serial, name text, email text)`;
        const users = await sql`SELECT * FROM users`;
        deepStrictEqual([...users], []);
    })
    it("insert a row", async() => {
        await sql`INSERT INTO users (name, email) VALUES ('John', 'asd@asd.asd')`;
        const users = await sql`SELECT * FROM users`;
        deepStrictEqual([...users], [{
            id: 1,
            name: "John",
            email: "asd@asd.asd"
        }]);
    })
    it("update a row", async() => {
        await sql`UPDATE users SET name = 'Jane' WHERE id = 1`;
        const users = await sql`SELECT * FROM users`;
        deepStrictEqual([...users], [{
            id: 1,
            name: "Jane",
            email: "asd@asd.asd"
        }]);
    })
    it("delete a row", async() => {
        await sql`DELETE FROM users WHERE id = 1`;
        const users = await sql`SELECT * FROM users`;
        deepStrictEqual([...users], []);
    })

    it("drop a table", async() => {
        const results = await sql`DROP TABLE IF EXISTS users`
        deepStrictEqual([...results], []);
    })

    it("close connection", async() => {
        await sql.end();
    })
})

