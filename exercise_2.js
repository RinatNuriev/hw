const http = require('http')
const fs = require('fs')
const axios = require('axios')
const path = require('path')

const port = 3000;

axios.get('https://jsonplaceholder.typicode.com/posts', {
    responseType: 'stream'
}).then(res => {
    res.data.pipe(fs.createWriteStream(path.resolve(__dirname, 'test.txt')))
})

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    fs.readFile('test.txt', 'utf-8', (err, data) => {
        if (err) console.log('wrong');
        res.end(data);
    })
})

server.listen(port, () => {
    console.log(`Server is running on ${port} port`);
})

