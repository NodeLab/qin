var os = require('os');
var fs = require('fs-extra');
var destination_path =  '.';

(function createApplication(path) {
  fs.mkdirs('./css',function(err){
    err ? console.log('something error') : console.log('create css')
  })
  fs.mkdirs('./js',function(err) {
    err ? console.log('something error') : console.log('create js')
  })
  fs.mkdirs('./img',function(err) {
    err ? console.log('something error') : console.log('create img')
  })
})(destination_path);





