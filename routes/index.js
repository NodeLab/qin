var express = require('express');
var router = express.Router();

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

module.exports = router;
