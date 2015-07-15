'use strict';
var koa = require('koa');
var router = require('koa-router')();
var request = require('request');

module.exports = function*(next) {
  router.all('*', function*(next) {
    res.header('Content-Type', 'application/json; charset=utf-8');
    var config = require('../utils/getConfig').config();
    if (!config.apiPath) {
      next();
      return;
    }
    if (config.apiPath.status) {
      if (!config.apiPath.url) {
        this.body({
          'msg': '接口未定义，请仔细检查'
        });
        return;
      }
      if (!this.url) {
        console.log('请求路径错误, 请检查请求路径');
        return;
      }
      var url = config.apiPath.url + this.url;
      console.log('已开启代理，转发请求至' + url);
      if (this.method.toUpperCase() === 'GET') {
        this.pipe(request(url))
          .pipe(res);
      }
      if (this.method.toUpperCase() === 'POST') {
        this.pipe(request.post(url, {
            form: req.body
          }))
          .pipe(res);
      }
    } else {
      yield next();
    }
    return;
  });
};
