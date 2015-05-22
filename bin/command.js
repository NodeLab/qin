#!/usr/bin/env node
'use strict';
global.RELOAD = true;
var path = require('path');
var program = require('commander');
var fs = require('fs-extra');
var cwd = process.cwd();
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var os = require('os');
var pkg = require('../package.json');
var config = require('../utils/getConfig');

var version = pkg.version;
var htmlPath = config.htmlPath;
var openFile = ' ';
var defaultPort;
program
  .version(version);

program
  .option('-p, --port [int]', '选择服务端口', setPort)
  .option('-o, --open <filename>', '选择默认打开文件', setOpen)
  .option('-b, --build', '构建', still)
  .option('-i, --init', '生成配置文件', initConfig)
  .option('-d, --deploy', '部署ftp', still)
  .option('-t, --test', '部署测试环境', still)
  .option('-e, --easy', '简单模式，无自动刷新', setReload);

program.parse(process.argv);


function setReload() {
  global.RELOAD = false;
}

function setOpen(name) {
  var base = cwd + '/' + htmlPath;
  var arr = fs.readdirSync(base);


  if (!isNaN(name) && name < arr.length) {
    arr = arr.filter(function(e) {
      return e.substr(-5) === '.html';
    });
    openFile = htmlPath + '/' + arr[name - 1];
    console.log('打开第' + name + '个html文件');
    console.log('\n文件夹内还有');
    console.log(arr);
    return;
  }
  arr.forEach(function(e) {
    if (e.indexOf(name) === 0) {
      openFile = htmlPath + '/' + e;
      console.log('打开首字母为' + name + '得html文件');
      return;
    }
  });

  // openFile = name || 'index.html'
}

function setPort(p) {
  defaultPort = p || undefined;
}

function initConfig() {
  fs.copy(path.join(__dirname, '../template/config.json'), cwd + '/config.json', function(err) {
    if (err) {
      return console.error(err);
    }
  });
}

function still() {
  console.log('coming soon ...');
}

var getIPAddress = function() {
  var ifaces = os.networkInterfaces();
  var ip = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(hanlderIface);
  }
  function hanlderIface(details) {
    if (ip === '' && details.family === 'IPv4' && !details.internal) {
      ip = details.address;
      return;
    }
  }
  return ip || '127.0.0.1';
};

var openURL = function(url) {
  switch (process.platform) {
    case 'darwin':
      exec('open' + url);
      console.log(url);
      break;
    case 'win32':
      exec('start ' + url);
      break;
    default:
      spawn('xdg-open', [url]);
  }
  return;
};

var server = require('../lib/server');
if (global.RELOAD) {
  require('../lib/socket');
  require('../lib/watcher');
}
var portfinder = require('portfinder');
portfinder.getPort(function(err, port) {
  if (err) {
    return;
  }
  port = defaultPort ? defaultPort : port;
  server.listen(port, function() {
    openURL(' http://' + getIPAddress() + ':' + port + '/' + openFile);
  });
});
