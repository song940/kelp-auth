const http = require('http');
const kelp = require('kelp');
const auth = require('..');

const app = kelp();

app.use(auth({
    username: 'a',
    password: 'bc',
    realm: 'Hello',
}));

app.use((req, res) => {
    res.end("hello world");
});

http.createServer(app).listen(3000);