'use strict';
var express = require('express');
var router = express.Router();
var cwd = process.cwd();
var fs = require('fs');
var path = require('path');
//enable the proxy
var types = [
  '.html',
  '.ftl'
];
router.get('*', function(req, res, next) {
  var file;
  if (req.url.slice(-1) === '/') {
    var fi = existIndex(req.url);
    if (fi) {
      file = fi;
    } else {
      next();
    }
  } else {
    var ft = existType(req.url);
    if (ft) {
      file = ft;
    } else {
      next();
    }
  }
  if (file) {
    file = decodeURI(file);
    if (!sendRenderHtml(file, res)) {
      next();
    }
  }

});

function sendRenderHtml(file, res) {
  if (!fs.existsSync(file)) {
    return false;
  }
  fs.readFile(file, 'utf8', function(err, contents) {
    if (err) {
      console.error(err);
      throw Error;
    }
    if (res.fmResult) {
      contents = res.fmResult;
    }
    contents += '\n\n<!-- Inserted by Reload -->\n<script src="/socket.io/socket.io.js"></script>\n\n<script src="/reload/reload.js"></script>\n<!-- End Reload -->\n';
    res.type('text/html');
    res.send(contents);
  });
  return true;
}

function existIndex(url) {
  for (var i = 0, len = types.length; i < len; i++) {
    url = path.join(cwd, url, 'index' + types[i]);
    if (fs.existsSync(url)) {
      return url;
    }
    return false;
  }
}

function existType(url) {
  for (var i = 0, len = types.length; i < len; i++) {
    if (url.indexOf(types[i]) > -1) {
      url = path.join(cwd, url);
      return url;
    }
  }
  return false;
}

module.exports = router;
