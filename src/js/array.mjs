// stable ES, web standards and stage 3 ES proposal
import "core-js/actual/array/index.js"

import { describe, it } from 'node:test'
import { deepStrictEqual, deepEqual } from 'node:assert'


describe("Arrey new features",  () => {
    describe("new immutable array functions", ()=> {
        it("old way to change arrays (mutable)", ()=> {
            const items = [1, 3, 2]
            
            items.sort()
            deepStrictEqual(items, [1, 2, 3], "the value was mutate by sort!")
            
            items.reverse()
            deepStrictEqual(items, [3, 2, 1], "the value was mutate by reverse")
            
            items.splice(1, 1)
            deepStrictEqual(items, [3, 1], "the value ")
        })

        it("[toSorted", ()=>{
            const input = [1, 3, 2]
            const output = input.toSorted() // import on line 1
            deepStrictEqual(output, [1, 2, 3])
            deepStrictEqual(input, [1, 3, 2])
        })
        it("[toSpliced", ()=>{
            const input = [1, 3, 2]
            const output = input.toSpliced(1, 2) // import on line 1
            deepStrictEqual(output, [1])
            deepStrictEqual(input, [1, 3, 2])
        })
        it("[toReversed", ()=>{
            const input = [1, 3, 2]
            const output = input.toReversed() // import on line 1
            deepStrictEqual(output, [2, 3, 1])
            deepStrictEqual(input, [1, 3, 2])
        })
        it("[with]", ()=>{
            const input = [1, 3, 2]
            const output = input.with(0, 10).with(1, 120).with(2, 30) // import on line 1
            deepStrictEqual(output, [10, 120, 30])
            deepStrictEqual(input, [1, 3, 2])
        })
    })
    describe("gruopping", ()=> {
        it('old way to gourp items', ()=> {
            const mapped = {
                even: [],
                odd: []
            }
            ;[0,1,2,3].forEach(num => num % 2 === 0 ?
                mapped.even.push(num) :
                mapped.odd.push(num)
            )

            deepStrictEqual(mapped, {
                even: [0, 2],
                odd: [1, 3]
            })
        })

        it('new way to gourp items', ()=> {
            const mapped = [0,1,2,3]
                .group(num => num % 2 === 0 ? "even" : "odd")

            deepEqual(mapped, {
                even: [0, 2],
                odd: [1, 3]
            })
        })
    })
})
