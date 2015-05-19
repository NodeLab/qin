'use strict';
var fs = require('fs-extra');
var cwd = process.cwd();
var existsSync = fs.existsSync;
var path = require('path').join;


exports.config = function(type) {

  Object.keys(require.cache)
    .forEach(function(key) {
      delete require.cache[key];
    });

  if (type === 'test') {
    return require(path(__dirname, '../test/config.json'));
  }

  return existsSync(path(cwd, '/config.json')) ?
    require(path(cwd, 'config.json')) :
    require(path(__dirname, '../config.json'));
};
