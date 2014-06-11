var User = require('../proxy/user');
exports.intro = function (req,res) {
	console.log('controller get');
	//User.insert(1,user);
	User.insert(req.body,'user');
	res.header("Content-Type", "application/json; charset=utf-8");
	res.send(req.body);
}

exports.prize = function(req,res) {
	res.header("Content-Type", "application/json; charset=utf-8");
	var prize_list = [ ];
	var no_prize = {
		code: 406,
		msg: {
		message: "感谢您的关注，活动已关闭！"
		}
	};
	var prize_rank = {
		code: 200,
		msg: {
			chanceNum: 0,
			recordId: 1850413,
			prize: {
				memo: "",
				pic: "",
				prizeId: 2845,
				prizeName: "我是测试用的奖品",
				prizeType: 0,
				rank: 3
			}
		}
	};
	var no_chance = {
		code: 501,
		msg: {
		message: "对不起，您还剩余0次抽奖机会！"
		}
	}

	prize_list.push(no_prize,prize_rank,no_chance)
	res.send(prize_list[Math.floor(Math.random()*prize_list.length)]);
}

exports.account = function(req,res) {
	res.header("Content-Type", "application/json; charset=utf-8");
	var result = {
			code: 200,
			msg: {
			id: 15448257,
			email: "244883833@qq.com",
			name: "都被占用了啊",
			mobile: "13391129699"
			}
		}
	res.send(result);
}