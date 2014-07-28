var express = require('express');
var router = express.Router();
var cwd = process.cwd();
var controller = require('../controllers/index')
var config = require('../utils/getConfig')
var request = require('request')

/* GET home page. */

router.get('/test',function(req,res){
	res.send('xixix')
})

router.get('/intro', function(req, res) {
	res.sendfile('public/intro.html');
});

router.get('*',function(req,res){

	res.header("Content-Type", "application/json; charset=utf-8");
	var _r = config.ajaxList[req.path]

	if (_r) {
		res.send(_r)
		return 
	} else {
		var url = config.apiPath + req.url
	  	req.pipe(request(url))
	  		.pipe(res)
	  	return 
	}
})


module.exports = router;
