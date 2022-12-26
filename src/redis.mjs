import { createClient } from "redis";
import { describe, it } from "node:test";
import { deepStrictEqual } from "assert";

// create client connection to redis server
const client = createClient({
    hostname: "localhost",
    port: 6379,
});

// create a new key
client.set("foo", "bar");

// get the value of the key
const value = client.get("foo");
describe("redis", () => {
    it("set a key", () => {
        deepStrictEqual(value, "bar");
    });
})
