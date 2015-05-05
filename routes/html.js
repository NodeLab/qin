var express  = require('express');
var router   = express.Router();
var cwd      = process.cwd();
var path     = require('path');
var fs       = require('fs');
var path     = require('path');
var dir      = process.argv[3];
//enable the proxy

router.all('*', function(req, res, next) {
  if (req.url != '/' && req.url.indexOf('.html') < 0) {
    next();
  } else if (req.url == '/' && !fs.existsSync(path.join(process.cwd(),'index.html'))){
    next();
  } else {
    sendRenderHtml(path.join(process.cwd(), req.url == '/' ? 'index.html' : req.url), res);
  }
});
function sendRenderHtml(file, res) {
  fs.readFile(file, 'utf8', function(err, contents) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    contents += '\n\n<!-- Inserted by Reload -->\n<script src="/socket.io/socket.io.js"></script>\n\n<script src="/reload/reload.js"></script>\n<!-- End Reload -->\n';
    res.type('text/html');
    res.send(contents);
  });
}

module.exports = router;
