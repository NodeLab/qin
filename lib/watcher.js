'use strict';
var chokidar = require('chokidar');
var io = require('./socket');
var path = require('path');
var clc = require('cli-color');
var cwd = process.cwd();
chokidar.watch(path.join(process.cwd()))
  .on('change', function(changePath) {
    if (isType(changePath, 'ftl')) {
      io.emit('reloadAll');
    }
    if (isType(changePath, 'html')) {
      io.emit('reloadAll');
    }
    if (isType(changePath, 'css')) {
      io.emit('reloadCss');
    }
    if (isType(changePath, 'js')) {
      io.emit('reloadAll');
    }
    console.log(
      clc.bgMagenta('|watch|'),
      clc.blackBright('["' + path.replace(cwd + '/', '') + '"]') + ' ' + clc.green('changed'));
  });

function isType(changePath, type) {
  return changePath.indexOf('.' + type) > -1;
}
