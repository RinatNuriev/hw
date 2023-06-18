var express = require('express');
var axios = require('axios')
var app = express();

app.get('/', (req, res) => {
    res.send('response');
});

app.get('/hello/', (req, res) => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => res.send(response.data));
});

app.get('/hello/:id', (req, res) => {
    const id = req.query.id
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => res.send(response.data));
});

app.listen(3000);