#!/usr/bin/env node

var program = require('commander');
var fs = require('fs-extra');
var cwd = process.cwd();
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var os = require('os');
var pkg = require('../package.json');
var app = require('../app')
var config = require('../utils/getConfig')

var version = pkg.version
var port = pkg.port
var htmlPath = config.htmlPath
var openFile = ' '
var projectName

program
  .version(version)
//.option('-p, --port [int]', '选择服务端口')

program
  .option('-p, --port [int]', '选择服务端口', setPort)
  .option('-o, --open <filename>', '选择默认打开文件', setOpen)
  .option('-b, --build', '构建', still)
  .option('-i, --init', '生成配置文件', initConfig)
  .option('-d, --deploy', '部署ftp', still)
  .option('-t, --test', '部署测试环境', still);
program
  .command('create <name> <type>')
  .description('搭建项目原型(当前路径)')
  .action(CreateApp);
program.parse(process.argv);

function setOpen(name) {
  var base = cwd + '/' + htmlPath
  var arr = fs.readdirSync(base)


  if (!isNaN(name) && name < arr.length) {
    arr = arr.filter(function(e) {
      return e.substr(-5) === '.html'
    })
    openFile = htmlPath + "/" + arr[name - 1]
    console.log('打开第' + name + '个html文件')
    console.log('\n文件夹内还有')
    console.log(arr)
    return
  }
  arr.forEach(function(e) {
    if (e.indexOf(name) == 0) {
      openFile = htmlPath + "/" + e
      console.log('打开首字母为' + name + '得html文件')
      return
    }
  })

  // openFile = name || 'index.html'
}

function CreateApp(name, type) {
  projectName = name
  var type = type ? type : 'pc';
  fs.copy(__dirname + '/../template/' + type, cwd + '/' + name + '/', function(err) {
    if (err) return console.error(err);
    console.log('创建原型成功!')
  }); //copies directory, even if it has subdirectories or files
}

function setPort(p) {
  port = p || 3000
}

function initConfig() {
  fs.copy(__dirname + '/../template/config.json', cwd + '/config.json', function(err) {
    if (err) return console.error(err);

  })
}

function still() {
  console.log('coming soon ...')
}

var getIPAddress = function() {
  var ifaces = os.networkInterfaces();
  var ip = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(function(details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
      }
    });
  }
  return ip || "127.0.0.1";
};

var openURL = function(url) {
  switch (process.platform) {
    case "darwin":
      exec('open' + url);
      console.log(url)
      break;
    case "win32":
      exec('start ' + url);
      break;
    default:
      spawn('xdg-open', [url]);
  }
  return
};

app.set('port', port);
require('../lib/socket');
require('../lib/watcher');
require('../lib/server').listen(app.get('port'), function() {
  openFile && openURL(" http://" + getIPAddress() + ':' + port + '/' + openFile);
});



