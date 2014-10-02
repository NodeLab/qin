#!/usr/bin/env node
var os = require('os');
var cwd = process.cwd();
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var directory = require('serve-index');

var index = require('./routes/index');
var app = express();

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded()); 
app.use(cookieParser());


app.use(express.static(path.join(cwd)));
app.use(express.static(__dirname+'/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', index);
app.use(directory(cwd));
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

exports = module.exports = app;

