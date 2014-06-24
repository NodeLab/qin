var express = require('express');
var router = express.Router();
var controller = require('../controllers/index')

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
  res.sendfile('views/index.html');
});

router.get('/simple_form',function(req,res) {
	res.render('simple_form',{ title : 'Simple Form'});
});

router.post('/uploader',function(req,res) {
	console.log(req.files);
})

router.get('/prize/ajax/prizeDraw',controller.prize)

router.get('/ajax/json/account/info',controller.account)

router.get('/prize/ajax/recordList',controller.recordList)

router.get('/vote/ajax/ajaxVote',controller.vote)

module.exports = router;
