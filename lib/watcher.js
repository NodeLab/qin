var chokidar = require('chokidar');
var io       = require('./socket');
var path     = require('path');
var clc      = require('cli-color');
io.sockets.on('connection', function(socket) {
  chokidar.watch(path.join(process.cwd()))
    .on('change', function(path) {
      if (isType(path, 'ftl')) {
        socket.emit('reloadAll');
      }
      if (isType(path, 'html')) {
        socket.emit('reloadAll');
      }
      if (isType(path, 'css')) {
        socket.emit('reloadCss');
      }
      if( isType(path, 'js')) {
        socket.emit('reloadAll');
      }
      console.log(clc.blackBright(path) + ': ' + clc.green('changed'));
    });
});


function isType(path, type) {
  return path.indexOf('.' + type) > -1;
}

