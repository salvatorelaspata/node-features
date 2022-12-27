import { fastify } from 'fastify'

const app = fastify()

app.get('/', async (request, reply) => {
    return { hello: 'Fastify' }
})

app.listen({host: '0.0.0.0', port: 3002}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Fastify app listening on ${address}`)
})

export default app