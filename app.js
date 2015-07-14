#!/usr/bin/env node

'use strict';

var path = require('path');
var fs = require('fs');
var cwd = process.cwd();
// koa
var koa = require('koa');
var app = koa();
var favicon = require('koa-favicon');
var bodyParser = require('koa-bodyparser');
var directory = require('koa-serve-index');
var staticloader = require('koa-static');
var view = require('koa-views');
var route = require('koa-route');
// router
var mockRouter = require('./routes/mock');
var proxyRouter = require('./routes/proxy');
var ftlRouter = require('./routes/ftl');
var reloadRouter = require('./routes/reload');
var handlerRouter = require('./routes/handler');


app.use(favicon());
app.use(bodyParser());

app.use(view(path.join(__dirname, 'views')));

app.use(route.get('/', ftlRouter));
app.use(route.get('/', reloadRouter));

//handler static
app.use(staticloader(path.join(cwd)));
app.use(staticloader(path.join(__dirname, 'public')));

var config = fs.existsSync(path.join(cwd, '/config.json')) ?
  require(path.join(cwd, 'config.json')) :
  require(path.join(__dirname, '/config.json'));
if (config.routes) {
  for (var i in config.routes) {
    app.use(i, staticloader(path.join(cwd, config.routes[i])));
  }
}

// mount router
app.use(route.get('/', mockRouter));
app.use(route.get('/', proxyRouter));
app.use(directory(cwd, {
  'icons': true
}));
app.use(route.get('/', handlerRouter));



/// catch 404 and forwarding to error handler
app.use(function*(err, ctx) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function*(err, ctx) {
  console.error(err.stack);
  this.status = 500;
  this.body('Something broke!');
});

if (app.env === 'development') {
  app.use(function*(err, ctx) {
    this.status(err.status || 500);
    yield this.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function*(err, ctx) {
  this.status(err.status || 500);
  yield this.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(8080);

module.exports = app;
