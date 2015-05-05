var chokidar = require('chokidar');
var io       = require('./socket');
var path     = require('path');
var clc      = require('cli-color');
chokidar.watch(path.join(process.cwd()))
  .on('change', function(path) {
    if (isType(path, 'ftl')) {
      io.emit('reloadAll');
    }
    if (isType(path, 'html')) {
      io.emit('reloadAll');
    }
    if (isType(path, 'css')) {
      io.emit('reloadCss');
    }
    if( isType(path, 'js')) {
      io.emit('reloadAll');
    }
    console.log(clc.blackBright(path) + ': ' + clc.green('changed'));
  });

function isType(path, type) {
  return path.indexOf('.' + type) > -1;
}

