#!/usr/bin/env node
var program = require('commander');
var fs = require('fs-extra');
var cwd = process.cwd();
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var os = require('os');
var pkg = require('../package.json');
var app = require('../app')


var version = pkg.version;
var port = pkg.port
var openFile=' '
var projectName

program
  .version(version)
  //.option('-p, --port [int]', '选择服务端口')

program
  .option('-p, --port [int]', '选择服务端口',setPort)
  .option('-o, --open <filename>', '选择默认打开文件',setOpen)
  .option('-b, --build', '构建',still)
  .option('-i, --init', '生成配置文件',initConfig)
  .option('-s, --scafford [ProjectName]', '搭建项目原型',CreateApp)
  .option('-d, --deploy', '部署ftp',still)
  .parse(process.argv);

function setOpen(name) {
  openFile = name || 'index.html'
}
function CreateApp(name){
  projectName = name 
  fs.copy(__dirname + '/../template', cwd + '/' + name + '/', function(err){
  if (err) return console.error(err);
  console.log("success!")
  }); //copies directory, even if it has subdirectories or files
}

function setPort(p){
	port = p || 3000 
}

function initConfig(){
  fs.copy(__dirname + '/../template/config.json',cwd+'/config.json',function(err) {
    if (err) return console.error(err);
    console.log("success!") 
  })  
}

function still(){
  console.log('coming soon ...')
}

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

//run server
app.set('port',port)
var server = app.listen(app.get('port'), function() {
  console.log('服务器监听' + server.address().port + '端口,可以通过-p参数指定端口,本机ip:'+getIPAddress())
  openURL(getIPAddress() + ':' + port + '/' + openFile)
});

// initConfig()




