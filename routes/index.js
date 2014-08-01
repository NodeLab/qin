var express = require('express');
var request = require('request')
var router = express.Router();
var cwd = process.cwd();

var controller = require('../controllers/index')
var config = require('../utils/getConfig')

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
	var _r = config.ajaxList[req.path]

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
	req.pipe(request.post(url))
		.pipe(res)
	return 
})
module.exports = router;
