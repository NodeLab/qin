'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');

router.all('*', function(req, res, next) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  var config = require('../utils/getConfig').config();
  if (!config.apiPath) {
    next();
    return;
  }
  if (config.apiPath.status) {
    if (!config.apiPath.url) {
      res.send({
        'msg': '接口未定义，请仔细检查'
      });
      return;
    }
    if (!req.url) {
      console.log('请求路径错误, 请检查请求路径');
      return;
    }
    var url = config.apiPath.url + req.url;
    console.log('已开启代理，转发请求至' + url);
    if (req.method.toUpperCase() === 'GET') {
      req.pipe(request(url))
        .pipe(res);
    }
    if (req.method.toUpperCase() === 'POST') {
      req.pipe( request.post( url, { form: req.body}))
        .pipe(res);
    }
  } else {
    next();
  }
  return;
});

module.exports = router;
