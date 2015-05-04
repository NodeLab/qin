var express = require('express');
var router = express.Router();
var cwd = process.cwd();
var path = require('path');

var Freemarker = require('freemarker.js');

//enable the proxy
router.get('*.ftl',function(req,res){
		var fm = new Freemarker({
		  viewRoot: path.join(cwd),
		  options: {
		    /** for fmpp */
		  }
		});
    var ftlName = req.path.replace('/', '');
		// Sync render
		var result = fm.renderSync(ftlName, {});
		res.send(result);
});

module.exports = router;
