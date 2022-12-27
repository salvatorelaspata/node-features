import { createServer } from 'http';
import { createReadStream } from 'fs';

const server = createServer((req, res) => {
    // const path = req.url === '/' ? '/index.html' : req.url;
    // const stream = createReadStream(`./${path}`);
    // stream.pipe(res);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello NodeJS!</h1>');
});

server.listen(3000, () => {
    console.log('VanillaJS app listening on port 3000!');
})

export default server;