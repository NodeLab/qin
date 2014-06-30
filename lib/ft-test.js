var os = require('os');
var fs = require('fs-extra');
var destination_path =  '.';
var result = {
			code: 200,
			msg: {
			id: 15448257,
			email: "244883833@qq.com",
			name: "都被占用了啊",
			mobile: "13391129699"
			}
		}


var temp = require('../config')
temp.ajaxList['/vote/ajax/ajaxVote'] = result
fs.writeJson('config.json',temp,function(err){
	console.log(err)
})





