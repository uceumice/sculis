const express = require('express');
const favicon = require('express-favicon');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;


app.use(favicon(__dirname + '/favicon.ico'));

app.use(express.static(path.join(__dirname)));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port);