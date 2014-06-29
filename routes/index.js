var express = require('express');
var router = express.Router();
var controller = require('../controllers/index')

/* GET home page. */
router.get('/intro', function(req, res) {
  //res.render('index', { title: 'Express' });
  res.sendfile('intro.html');
});

router.get('/prize/ajax/prizeDraw',controller.prize)

router.get('/ajax/json/account/info',controller.account)

router.get('/prize/ajax/recordList',controller.recordList)

router.get('/vote/ajax/ajaxVote',controller.vote)



module.exports = router;
