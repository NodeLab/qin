var chokidar = require('chokidar');
var io       = require('./socket');
var path     = require('path');
chokidar.watch(path.join(process.cwd()))
  .on('change', function(path) {
    if (isType(path, 'html')) {
      console.log('html')
      io.emit('reloadAll');
    }
    if (isType(path, 'css')) {
      io.emit('reloadCss');
    }
    if( isType(path, 'js')) {
      io.emit('reloadAll');
    }
  });

function isType(path, type) {
  return path.indexOf('.' + type) > -1;
}

