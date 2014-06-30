var express = require('express');
var router = express.Router();
var controller = require('../controllers/index')
var config = require('../config.json')

/* GET home page. */

router.get('/test',function(req,res){
	res.send('xixix')
})
router.get('/intro', function(req, res) {
	res.sendfile('public/intro.html');
});
router.get('*',function(req,res){
	res.header("Content-Type", "application/json; charset=utf-8");
	var result = config.ajaxList[req.path] || "Hello World"
	res.send(result)
})



// router.get('/prize/ajax/prizeDraw',controller.prize)

// router.get('/ajax/json/account/info',controller.account)

// router.get('/prize/ajax/recordList',controller.recordList)

// router.get('/vote/ajax/ajaxVote',controller.vote)



module.exports = router;
