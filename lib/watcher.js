var chokidar = require('chokidar');
var io       = require('./socket');
var path     = require('path');
io.sockets.on('connection', function(socket) {
  chokidar.watch(path.join(process.cwd()))
    .on('change', function(path) {
      if (isType(path, 'html')) {
        socket.emit('reloadAll');
      }
      if (isType(path, 'css')) {
        socket.emit('reloadCss');
      }
      if( isType(path, 'js')) {
        socket.emit('reloadAll');
      }
    });
});


function isType(path, type) {
  return path.indexOf('.' + type) > -1;
}

