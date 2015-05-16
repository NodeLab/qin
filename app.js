#!/usr/bin/env node
'use strict';
var cwd = process.cwd();

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var directory = require('serve-index');

var mockRouter = require('./routes/mock');
var proxyRouter = require('./routes/proxy');
var ftlRouter = require('./routes/ftl');
var reloadRouter = require('./routes/reload');
var handlerRouter = require('./routes/handler');
var app = express();

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use('/', ftlRouter);
app.use('/', reloadRouter);

//handler static
app.use(express.static(path.join(cwd)));
app.use(express.static(path.join(__dirname, 'public')));

// mount router
app.use('/', mockRouter);
app.use('/', proxyRouter);
app.use(directory(cwd, {
    'icons': true
}));
app.use('/', handlerRouter);



/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});


if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res) {
    console.log(req.params.name);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
