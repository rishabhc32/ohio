var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var addLinkRouter = require('./routes/addLink');
var viewLinkRouter = require('./routes/viewLink');
var linkRouter = require('./routes/link');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/addLink', addLinkRouter);
app.use('/view', viewLinkRouter);
app.use('/*', linkRouter);

app.use((req, res) => {
    res.sendStatus(404);
});

module.exports = app;
