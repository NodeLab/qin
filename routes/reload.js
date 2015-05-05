var express  = require('express');
var router   = express.Router();
var cwd      = process.cwd();
var fs       = require('fs');
var path     = require('path');

//enable the proxy
var types    = [
                '.html',
                '.ftl'
               ];
// /^.*\.[html | ftl]$/
router.get('*', function(req, res, next) {
  var file;
  if (req.url == '/') {
    var _fi = existIndex();
    _fi ? file = _fi : next();
  } else {
    var _ft = existType(req.url);
     _ft ? file = _ft : next();
  }
  if (file) {
    sendRenderHtml(path.join(cwd, file), res);
  }

});

function sendRenderHtml(file, res) {
  fs.readFile(file, 'utf8', function(err, contents) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    if (res.fmResult) {
      contents = res.fmResult;
    }
    contents += '\n\n<!-- Inserted by Reload -->\n<script src="/socket.io/socket.io.js"></script>\n\n<script src="/reload/reload.js"></script>\n<!-- End Reload -->\n';
    res.type('text/html');
    res.send(contents);
  });
}

function existIndex() {
  for (var i = 0, len = types.length; i < len; i ++) {
    if (fs.existsSync(path.join(cwd, 'index' + types[i]))) {
      return 'index' + types[i];
    }
  return false;
  }
}

function existType(url) {
  for (var i = 0, len = types.length; i < len; i ++ ) {
    if (url.indexOf(types[i]) > -1) {
      return url;
    }
  }
  return false;
}

module.exports = router;
