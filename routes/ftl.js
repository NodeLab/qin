var express = require('express');
var router = express.Router();
var cwd = process.cwd();
var path = require('path');

var Freemarker = require('freemarker.js');

//enable the proxy
router.get('*.ftl',function(req,res){
	// if (req.path.split('.')[1] == 'ftl') {
		var Freemarker = require('freemarker.js');
		var fm = new Freemarker({
		  viewRoot: path.join(cwd) + '/ftl',
		  options: {
		    /** for fmpp */
		  }
		});

		var accountInfoDto = {
			"oldThan18":"true", 
			"showAmount":"Y",
			"epayAccountDto":{
				"accountName":"qinyuwei"
			},      
			"bankCardNum":0  
		};

		// Sync render
		var result = fm.renderSync('index.ftl', accountInfoDto);
		console.log('1' + result + '2');
		console.log(typeof result);
		res.send(result);
})

module.exports = router;