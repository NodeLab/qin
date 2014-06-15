#!/usr/bin/env node
var os = require('os');
var connect = require('connect');
var cwd = process.cwd();
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var openURL = function (url) {
  switch (process.platform) {
    case "darwin":
      exec('open ' + url);
      break;
    case "win32":
      exec('start ' + url);
      break;
    default:
      spawn('xdg-open', [url]);
  }
};

/**
 * Get ip(v4) address
 * @return {String} the ipv4 address or 'localhost'
 */
var getIPAddress = function () {
  var ifaces = os.networkInterfaces();
  var ip = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
      }
    });
  }
  return ip || "127.0.0.1";
};

var app = connect();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(connect.static(cwd));
app.use(connect.directory(cwd));
var port = 4000;
app.listen(port, function () {
  var url = "http://" + getIPAddress() + ":" + port;
  console.log("Running at " + url);
  openURL(url+( process.argv[2]||'index.html'));
});