var client = require('../utils/db')
exports.insert=function(row,col){
    client.insert(row,col);   
}