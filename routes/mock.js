'use strict';
var express = require('express');
var router = express.Router();

router.all('*', function(req, res, next) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  var config = require('../utils/getConfig').config();
  var r = config.ajaxList[req.path];

  if (!r) {
    next();
    return;
  }
  var property;
  var isEqual = true;

  if (req.method === 'GET') {
    if (!('result' in r)) {
      res.send(r);
    }
    property = 'query';
  }

  if (req.method === 'POST') {
    if (r.type.toLowerCase() !== 'post') {
      return;
    }
    property = 'body';
  }
  for (var i in r[property]) {
    if (r[property][i] != req[property][i] && r[property][i] !== '*') {

      isEqual = false;
      break;
    }
  }

  if (isEqual) {
    res.send(r.result);
  } else {
    res.send(r.reject || '参数填写错误 请重新填写');
  }
  return;
});

module.exports = router;
