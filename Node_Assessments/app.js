const express = require('express');
const routes = require('./routes/routing');
const bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);
app.set('view engine', 'ejs');
app.listen(3000);
module.exports = app;
console.log("server live @ 3000");