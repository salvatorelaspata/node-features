import {describe, it} from 'node:test'
import {deepStrictEqual} from 'assert'

function decorator(prototypeClass) {
    const fns = Reflect.ownKeys(prototypeClass).filter(item => item !== "constructor")
    for( const fn of fns ) {
        prototypeClass[fn] = new Proxy(prototypeClass[fn], {
            __proto__: null,
            apply(fn, thisArg, argList){
                console.log(`[${fn.name} was called with: [${JSON.stringify(argList)} args, ${JSON.stringify(thisArg)}]]`)
                const result = fn.apply(thisArg, [...argList, 'antani'])
                return result
            }
        })
    }
}

class Database {
    person = new Proxy({ name: '' }, {
        set(currentContext, propertyKey, newValue){
            console.log({
                currentContext, propertyKey, newValue
            })
            currentContext[propertyKey] = newValue
            return true
        }
    })
    constructor() {
        decorator(Database.prototype)
    }
    create(...args){
        const [name] = args
        const inject = args.at(-1)
        console.log('creating...', inject)
        let counter = 10e4
        for(let i=0;i<=counter;i++);

        this.person.name = name
        this.person[inject] = inject
        return this.person
    }
}

describe('proxy-reflection', ()=>{
    it('constructor', ()=>{
        const database = new Database()
        deepStrictEqual(database.person, {
            name: ''
        })
    })
    it('proxy & reflection person', ()=> {
        const database = new Database()
        const p = database.create('salvatore')
        deepStrictEqual(p, {name: 'salvatore', antani: 'antani'})
    })
})