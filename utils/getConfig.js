var fs = require("fs-extra")
var cwd = process.cwd()
var existsSync = fs.existsSync

/*
    
*/
exports.config = function(sync){
    
    Object.keys(require.cache)
        .forEach( function(key) {
            delete require.cache[key];     
        })

    return existsSync(cwd + '/config.json') ? require( cwd+'/config.json' ) : require( __dirname + '/../config.json' )
}

