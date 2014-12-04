var fs = require("fs-extra");
var cwd = process.cwd();
var existsSync = fs.existsSync;
var path = require('path').join;

/*
    
*/
exports.config = function(sync){
    
    Object.keys(require.cache)
        .forEach( function(key) {
            delete require.cache[key];     
        })

    return existsSync( path(cwd, '/config.json') ) ? 
      require( path(cwd, 'config.json') ) : 
      require( path(__dirname, '../config.json') );
}

