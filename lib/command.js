var program = require('commander');
var mkdirp = require('mkdirp');
var os = require('os');
var fs = require('fs');
var path = require('path');

var pkg = require('../package.json');
var version = pkg.version;


program
  .version(version)
  .usage('[options]')
  //.option('-p, --port [int]', '选择服务端口')

program
  .option('-p, --port [int]', '选择服务端口')
  .option('-o, --open', '选择打开文件')
  .option('-b, --build', '构建')
  .option('-i, --init', '生成配置文件')
  .option('-s, --scafford', '搭建项目原型')
  .option('-d, --deploy', '部署ftp')
  .parse(process.argv);


// (function createApplication() {
//   emptyDirectory(path, function(empty){
//     if (empty || program.force) {
//       createApplicationAt(path);
//     } else {
//       program.confirm('destination is not empty, continue? ', function(ok){
//         if (ok) {
//           process.stdin.destroy();
//           createApplicationAt(path);
//         } else {
//           abort('aborting');
//         }
//       });
//     }
//   });
// })();

function still(){
  console.log('still in building')
}