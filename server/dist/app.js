"use strict";
exports.__esModule = true;
// tslint:disable-next-line: no-var-requires
var express = require('express');
// tslint:disable-next-line: no-var-requires
var cors = require('cors');
// tslint:disable-next-line: no-var-requires
var bodyParser = require('body-parser');
var app = express();
var port = 8000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mockData = require('./mockData'); // Mock data by default
app.get('/', function (req, res) { return res.send('Hello World!'); });
app.get('/sample-get-request', function (req, res) { return res.json(req.query); });
app.post('/sample-post-request', function (req, res) { return res.json(req.body); });
app.get('/users', function (req, res) {
    return res.json(mockData.users);
});
app.post('/users', function (req, res) {
    mockData.users = req.body;
    res.status(200).end();
});
app.get('/currentUser', function (req, res) {
    return res.json(mockData.currentUser);
});
app.post('/currentUser', function (req, res) {
    mockData.currentUser = req.body;
    res.status(200).end();
});
app.listen(port, function () { return console.log("Example app listening at http://localhost:" + port); });
