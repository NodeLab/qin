var User = require('../proxy/user');
exports.intro = function (req,res) {
	console.log('controller get');
	//User.insert(1,user);
	User.insert(req.body,'user');
	res.send(req.body);
}