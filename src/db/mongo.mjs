import { MongoClient } from "mongodb";
import { deepStrictEqual } from "assert";
import { describe, it } from "node:test";

const url =  "mongodb://localhost:27017/?maxPoolSize=20&w=majority";
const client = new MongoClient(url);
// await client.connect();
// const db = client.db("localdb");
// const collection = db.collection("users");
// await collection.deleteMany({});
// await collection.insertOne({ name: "John", email: "asd@asd.asd" });
// const users = await collection.find({}).toArray();
// console.log(users);
// await client.close();

describe("mongo", () => {
    it("connect", async() => {
        await client.connect();
        const db = client.db("localdb");
        const collection = db.collection("users");
        await collection.deleteMany({});
        await client.close();
    })
    it("insert a row", async() => {
        await client.connect();
        const db = client.db("localdb");
        const collection = db.collection("users");
        await collection.insertOne({ name: "John", email: "asd@asd.asd" });
        const users = await collection.find({}).toArray();
        deepStrictEqual(users[0].name, "John");
        deepStrictEqual(users[0].email, "asd@asd.asd");
        await client.close();
    })
    it("update a row", async() => {
        await client.connect();
        const db = client.db("localdb");
        const collection = db.collection("users");
        await collection.updateOne({ name: "John" }, { $set: { name: "Jane" } });
        const users = await collection.find({}).toArray();
        deepStrictEqual(users[0].name, "Jane")
        deepStrictEqual(users[0].email, "asd@asd.asd")
        await client.close();
    })
    it("delete a row", async() => {
        await client.connect();
        const db = client.db("localdb");
        const collection = db.collection("users");
        await collection.deleteOne({ name: "Jane" });
        const users = await collection.find({}).toArray();
        deepStrictEqual(users, []);
        await client.close();
    })
    it("close connection", async() => {
        await client.close();
    })
})
