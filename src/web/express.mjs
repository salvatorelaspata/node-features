import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello ExpressJS!');
});

app.listen(3001, () => {
    console.log('ExpressJS app listening on port 3001!');
});

export default app;