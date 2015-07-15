'use strict';
var koa = require('koa');
var router = require('koa-router')();
var cwd = process.cwd();
var path = require('path');

var Freemarker = require('freemarker.js');

module.exports = function*(next) {
	console.log('freemarker');
	//enable the proxy
	router.get('*.ftl', function*(next) {
		console.log('ftl');
		var fm = new Freemarker({
			viewRoot: path.join(cwd),
			options: {
				/** for fmpp */
			}
		});
		var ftlName = this.path.replace('/', '');
		// Sync render
		var result = fm.renderSync(ftlName, {});
		res.fmResult = result;
		yield next;
	});
};
