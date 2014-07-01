var express = require('express');
var router = express.Router();
var cwd = process.cwd();
var controller = require('../controllers/index')
var config = require(cwd+'/config.json')

/* GET home page. */

router.get('/test',function(req,res){
	res.send('xixix')
})
router.get('/intro', function(req, res) {
	res.sendfile('public/intro.html');
});
router.get('*',function(req,res){
	console.log(req)
	res.header("Content-Type", "application/json; charset=utf-8");
	var result = config.ajaxList[req.path] || "Hello World"
	res.send(result)
})

module.exports = router;
