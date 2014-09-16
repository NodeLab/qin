var fs = require("fs-extra")
var cwd = process.cwd()
var existsSync = fs.existsSync
var config 

Object.keys(require.cache)
    .forEach( function(key) {
        delete require.cache[key];     
    })

config = existsSync(cwd + '/config.json') ? require( cwd+'/config.json' ) : require( __dirname + '/../config.json' )

exports = module.exports = config 

