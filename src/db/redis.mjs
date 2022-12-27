import { createClient } from "redis";
import { describe, it } from "node:test";
import { deepStrictEqual } from "assert";

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));

// await client.connect();
// client.set("foo", "bar");
// const foo = await client.get("foo")
// deepStrictEqual(foo, "bar");
// await client.disconnect();

describe("redis", () => {
    it("set a key", async() => {
        await client.connect();
        client.set("foo", "bar");
        const foo = await client.get("foo")
        deepStrictEqual(foo, "bar");
        await client.disconnect();
    })
    it("get a key", async() => {
        await client.connect();
        const foo = await client.get("foo")
        deepStrictEqual(foo, "bar");
        await client.disconnect();
    })
    it("update a key", async() => {
        await client.connect();
        client.set("foo", "baz");
        const foo = await client.get("foo")
        deepStrictEqual(foo, "baz");
        await client.disconnect();
    })
    it("delete a key", async() => {
        await client.connect();
        client.del("foo");
        const foo = await client.get("foo")
        deepStrictEqual(foo, null);
        await client.disconnect();
    })
})