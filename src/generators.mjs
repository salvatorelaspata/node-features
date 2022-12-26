import {describe, it} from 'node:test'
import {deepStrictEqual} from 'assert'

const _range = function*(start, end){
    for (let i = start; i <= end; i++){
        yield i
    }
}
const _aRange = function(start, end) {
    return Array.from(
        {length: end-start}, 
        (v, i)=> start+i
    )
}

describe("the power of generator", ()=> {
    it("generator to create a range iterator", ()=> {
        const r = _range(10,234)
        r.next() // 10
        r.next() // 11
        r.next() // 12
        deepStrictEqual(r.next().value, 13)
    })
    it("another way to generate a range array", ()=> {
        const r = _aRange(10, 234)
        deepStrictEqual(r[3], 13)
    })
})