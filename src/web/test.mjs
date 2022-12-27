import { describe, it } from "node:test";
import { deepStrictEqual } from "assert";
describe("web service test", async () => {
    const [vanilla, express, fastify] = await Promise.all([
        import('./vanilla.mjs'),
        import('./express.mjs'),
        import('./fastify.mjs')
    ])

    it("test vanilla", () => {
        fetch("http://localhost:3000")
            .then((res) => res.text())
            .then((text) => {
                deepStrictEqual(text, "<h1>Hello NodeJS!</h1>");
            })
        vanilla.close()
    })
    it("test express", () => {
        fetch("http://localhost:3001")
            .then((res) => res.text())
            .then((text) => {
                deepStrictEqual(text, "Hello ExpressJS!");
            })
        express.close()

    })
    it("test fastify", () => {
        fetch("http://localhost:3002")
            .then((res) => res.json())
            .then((text) => {
                deepStrictEqual(text, { hello: 'Fastify' });
            })
        fastify.close()
    })
})
