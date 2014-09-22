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


// /test/1/2  
router.get('/test/:id/:is', function(req, res){
	//test/1
	req.path === "/test";
	var id = req.param.id;
	var is = req.param.is;
	// test/1?code=1
	var code = req.query.code;

})

router.post('/test', function(req, res) {
	var code = req.body.code;
})

//enable the proxy
router.get('*',function(req,res){
	res.header("Content-Type", "application/json; charset=utf-8");
	var config = require('../utils/getConfig').config();
	var _r = config.ajaxList[req._parsedUrl.path]

	if (_r) {
		res.send(_r)
		return 
	} else {
		var url = config.apiPath + req.url
		console.log(url)
	  req.pipe(request(url))
	  	.pipe(res)
	  return 
	}
})

router.post('*',function(req, res) {
	var config = require('../utils/getConfig')
	var url = config.apiPath + req.url
	req.pipe(request.post(url))
		.pipe(res)
	return 
})
module.exports = router;
