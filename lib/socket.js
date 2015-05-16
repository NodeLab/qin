'use strict';
var io = require('socket.io').listen(require('./server'));
exports = module.exports = io;
