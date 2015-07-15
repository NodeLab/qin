'use strict';
var koa = require('koa');
var router = require('koa-router')();

module.exports = function*(next) {
  router.get('*', function*(next) {
    this.header('Content-Type', 'application/json; charset=utf-8');
    var config = require('../utils/getConfig').config();
    var r = config.ajaxList[req.path];

    if (!r) {
      yield next;
      return;
    }
    var property;
    var isEqual = true;
    if (this.method === 'GET') {
      if (!('result' in r)) {
        this.body(r);
      }
      property = 'query';
    }

    if (this.method === 'POST') {
      if (r.type.toLowerCase() !== 'post') {
        return;
      }
      property = 'body';
    }

    for (var i in r[property]) {
      if (r[property][i] !== req[property][i] && r[property][i] !== '*') {
        isEqual = false;
        break;
      }
    }
    if (isEqual) {
      this.body(r.result);
    } else {
      this.body(r.reject || '参数填写错误 请重新填写');
    }
    return;
  });
};
