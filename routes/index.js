var express = require('express');
var request = require('request')
var router = express.Router();
var cwd = process.cwd();

var controller = require('../controllers/index')

/* GET home page. */

router.get('/test',function(req, res) {
	
	controller.test(req, res)
})

router.get('/intro', function(req, res) {
	res.sendfile('public/intro.html');
});

//console 

router.get('/console', function(req, res) {
	controller.console(req, res)
})

//enable the proxy
router.get('*',function(req,res){
	res.header("Content-Type", "application/json; charset=utf-8");
	var config = require('../utils/getConfig').config();
	var _r = config.ajaxList[req.path]

	if (! ('result' in _r)) {
		//simple
		res.send(_r)
	} else if (typeof _r == 'object') {
		//custom
		var type = _r.type;
		var isEqual = true;
		if (type.toLowerCase() != 'get') return
		for (var i in _r.query) {
			if (_r.query[i] != req.query[i] && _r.query[i] != '*') {
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
		var url = config.apiPath + req.url
		console.log('转发请求至'+url)
	  	req.pipe(request(url))
	  		.pipe(res)
	} else {
		res.send({'msg': '接口未定义，请仔细检查'})
	}
	return 
})

router.post('*',function(req, res) {
	res.header("Content-Type", "application/json; charset=utf-8");
	var config = require('../utils/getConfig').config();
	var _r = config.ajaxList[req.path];
	if (typeof _r == 'object' && _r.type == 'post') {
		var type = _r.type;
		var isEqual = true;
		if (type.toLowerCase() != 'post') return
		for (var i in _r.query) {
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
