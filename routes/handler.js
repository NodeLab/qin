'use strict';
var koa = require('koa');
var router = require('koa-router')();

module.exports = function*() {
	router.get('*', function*() {
		this.body('不好意思，这个，真没有\n温馨提示：若需开启代理，请配置config.json中apiPath.status');
	});
};
