var request = require('request')
var router = require('express').Router();
var cwd = process.cwd();
var path = require('path');

// server-index will intercept post request
router.post('*',function(req, res) {
	res.header("Content-Type", "application/json; charset=utf-8");
	var config = require('../utils/getConfig').config();
	var _r = config.ajaxList[req.path];
	if (typeof _r == 'object' && _r.type == 'post') {
		var type = _r.type;
		var isEqual = true;
    if (type.toLowerCase() !== 'post') {
      return;
    } 

		for (var i in _r.body) {
			if (_r.body[i] != req.body[i] && _r.body[i] != '*') {
				isEqual = false;
				break;
			}
		}

		if (isEqual) {
			res.send(_r.result);
		} else {
			res.send(_r.reject || '参数填写错误 请重新填写');
		}
	} else if ('apiPath' in config){
		//pipe
		var url = config.apiPath + req.url;
		console.log('转发请求至'+url);
		req.pipe(request.post(url))
			.pipe(res)	
	} else {
		res.send({'msg': '接口未定义，请仔细检查'})
	}
	return 
})

module.exports = router;
