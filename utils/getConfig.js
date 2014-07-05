var fs = require("fs-extra")
var cwd = process.cwd()
var existsSync = fs.existsSync
var config 

config = existsSync(cwd + '/config.json') ? require( cwd+'/config.json' ) : require( __dirname + '/../config.json' )

// fs.existsSync(cwd+'/config.json', function( exists ){

//     config = (exists ? require(cwd+'/config.json') : require(__dirname+"/../config.json") )
    
    
// });

exports = module.exports = config 

