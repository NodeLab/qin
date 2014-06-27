#!/usr/bin/env node
var program = require('commander');
var fs = require('fs-extra');
var cwd = process.cwd();
var pkg = require('../package.json');
var app = require('../app')


var version = pkg.version;
var port = pkg.port
var openFile
var projectName


console.log(__dirname)
program
  .version(version)
  //.option('-p, --port [int]', '选择服务端口')

program
  .option('-p, --port [int]', '选择服务端口',setPort)
  .option('-o, --open', '选择默认打开文件',still)
  .option('-b, --build', '构建',still)
  .option('-i, --init', '生成配置文件',still)
  .option('-s, --scafford <ProjectName>', '搭建项目原型',CreateApp)
  .option('-d, --deploy', '部署ftp',still)
  .parse(process.argv);

function CreateApp(name){
  fs.copy(__dirname + '/../template', cwd + '/' + name + '/', function(err){
  if (err) return console.error(err);
  console.log("success!")
  }); //copies directory, even if it has subdirectories or files
}

function setPort(p){
	port = p || 3000 ;
}

function still(){
  console.log('coming soon ...')
}



//run server
app.set('port',port)
var server = app.listen(app.get('port'), function() {
  console.log('server listening on port ' + server.address().port);
});





