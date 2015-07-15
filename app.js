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
var views = require('koa-views');
var router = require('koa-router')();
// router
var mockRouter = require('./routes/mock');
var proxyRouter = require('./routes/proxy');
var ftlRouter = require('./routes/ftl');
var reloadRouter = require('./routes/reload');
var handlerRouter = require('./routes/handler');

app.use(bodyParser());
app.use(favicon());

app.use(views({
  root: path.join(__dirname, 'views'),
  default: 'jade'
}))


router.get('/', ftlRouter);
router.get('/', reloadRouter);
// app.use(router.get('/', ftlRouter));
// app.use(router.get('/', reloadRouter));

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
router.get('/', mockRouter);
router.get('/', proxyRouter);
// app.use(router.get('/', mockRouter));
// app.use(router.get('/', proxyRouter));
app.use(directory(cwd, {
  'icons': false
}));
router.get('/', handlerRouter);
// app.use(router.get('/', handlerRouter));


app
  .use(router.routes())
  .use(router.allowedMethods());


/// catch 404 and forwarding to error handler
app.use(function*(next) {
  console.log('404');
  var err = new Error('Not Found');
  err.status = 404;
  // console.log(next);
  // next(err);
  // yield next(err);
});

app.use(function*(err, ctx) {
  console.log('500');
  console.error(err.stack);
  this.status = 500;
  this.body('Something broke!');
});

if (app.env === 'development') {
  app.use(function*(err, ctx) {
    console.log('development');
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
