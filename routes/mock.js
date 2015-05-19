var express = require('express');
var router  = express.Router();

router.all('*', function(req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8");
  var config = require('../utils/getConfig').config();
  var _r = config.ajaxList[req.path];

  if (!_r) {
    next();
    return;
  }
  var property;
  var isEqual = true;

  if (req.method == 'GET') {
    if (!('result' in _r)) {
      res.send(_r);
    }
    property = 'query';
  }

  if (req.method == 'POST') {
    if (_r.type.toLowerCase() !== 'post') {
      return;
    }
    property = 'body';
  }

  for (var i in _r[property]) {
    if (_r[property][i] != req[property][i] && _r[property][i] != '*') {
      isEqual = false;
      break;
    }
  }
  if (isEqual) {
    res.send(_r.result);
  } else {
    res.send(_r.reject || '参数填写错误 请重新填写');
  }
  return;
});

module.exports = router;