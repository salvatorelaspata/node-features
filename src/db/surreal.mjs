import Surreal from 'surrealdb.js';
import { deepStrictEqual } from 'assert';
import { describe, it } from 'node:test';

const db = new Surreal('http://localhost:8000/rpc');

const main = async () => new Promise(async (resolve, reject) => {
    try {
        // Signin as a namespace, database, or root user
        await db.signin({
            user: 'root',
            pass: 'root',
        });

        // Select a specific namespace / database
        await db.use('test', 'test');

        // Delete all person records
        await db.delete("person");

        // Create a new person with a random id
        let created = await db.create("person", {
            title: 'Founder & CEO',
            name: {
                first: 'Tobie',
                last: 'Morgan Hitchcock',
            },
            marketing: true,
            identifier: Math.random().toString(36).substr(2, 10),
        });

        // Update a person record with a specific id
        let updated = await db.change(created.id, {
            marketing: false,
        });

        // Select all people records
        let people = await db.select("person");

        // Perform a custom advanced query
        let groups = await db.query('SELECT marketing, count() FROM type::table($tb) GROUP BY marketing', {
            tb: 'person',
        });

        // close the connection
        db.close();

        resolve({
            created,
            updated,
            people,
            groups,
        })
        
        // {
        //     created: '{"id":"person:xvecwuqpyduk9f5n4gcz","identifier":"gphus8j8za","marketing":true,"name":{"first":"Tobie","last":"Morgan Hitchcock"},"title":"Founder & CEO"}',
        //     updated: '{"id":"person:jaime","marketing":false}',
        //     people: '[{"id":"person:5clg0l5ea4qz2src3raa","identifier":"q09461blto","marketing":true,"name":{"first":"Tobie","last":"Morgan Hitchcock"},"title":"Founder & CEO"},{"id":"person:7jhfo86n7bpwuba6gmsx","identifier":"ho0h83ws1o","marketing":true,"name":{"first":"Tobie","last":"Morgan Hitchcock"},"title":"Founder & CEO"},{"id":"person:jaime","marketing":false},{"id":"person:wvz87asz6rxv3g7v8qvc","identifier":"3pgswbcahr","marketing":true,"name":{"first":"Tobie","last":"Morgan Hitchcock"},"title":"Founder & CEO"},{"id":"person:xvecwuqpyduk9f5n4gcz","identifier":"gphus8j8za","marketing":true,"name":{"first":"Tobie","last":"Morgan Hitchcock"},"title":"Founder & CEO"}]',
        //     groups: '[{"result":[{"count":1,"marketing":false},{"count":4,"marketing":true}],"status":"OK","time":"394.763µs"}]'
        // }
          
    } catch (e) {
        reject(e);
        console.error('ERROR', e);
    }
});

main()
.then(({
    created,
    updated,
    people,
    groups, }) => {
    describe("surreal", () => {
        it("create a record", async () => {
            deepStrictEqual(created.name, {
                    first: 'Tobie',
                    last: 'Morgan Hitchcock',
                });
            deepStrictEqual(created.title, 'Founder & CEO');
            deepStrictEqual(created.marketing, true);
        })
        it("update a record", async () => {
            deepStrictEqual(updated.marketing, false);
        })
        it("select records", async () => {
            deepStrictEqual(people, [{
                id: created.id,
                title: 'Founder & CEO',
                name: {
                    first: 'Tobie',
                    last: 'Morgan Hitchcock',
                },
                marketing: false,
                identifier: created.identifier,
            }]);
        })
        it("query records", async () => {
            deepStrictEqual(groups[0].result, [{
                marketing: false,
                count: 1,
            }]);
        })
    })
})
// .then(console.log)
.catch(console.error);