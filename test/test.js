'use strict';

var fs = require('fs');
var should = require('should');
var app = require('../app');
var request = require('request');
var config = require('../utils/getConfig').config('test');
var querystring = require('querystring');

describe('Utils', function() {

  describe('auto reload config.json', function() {

    var src = {};

    for (var i in config) {
      src[i] = config[i];
    }
    after(function() {
      fs.writeFile('config.json', JSON.stringify(src, null, '    '));
    });
    it('should update reload', function(done) {
      config.t = 'changed';
      fs.writeFile('config.json', JSON.stringify(config), function(err) {
        if (err) {
          console.log(err);
        }
        var changed = require('../utils/getConfig').config();
        changed.t.should.be.eql('changed');
        done();
      });
    });
  });
});


describe('Routes', function() {
  describe('response the request', function() {
    var sever;
    before(function() {
      sever = app.listen(3000);
    });
    after(function() {
      sever.close();
    });
    it('should get the request in config.json ', function(done) {
      request.get('http://localhost:3000/prize/ajax/prizeDraw?groupId=198', function(err, res, body) {
        if (err) {
          console.log(err);
        }
        var path = res.req.path;
        path = path.substring(0, path.indexOf('?'));
        var result = config.ajaxList[path];
        var res_body = JSON.parse(body);
        result.should.be.eql(res_body);
        done();
      });
    });

    it('should response the post request in  config.json ', function(done) {
      request.post({
        url: 'http://localhost:3000/post',
        form: {
          groupId: '189'
        }
      }, function(err, res, body) {
        if (err) {
          console.log(err);
        }
        var path = res.req.path;
        var result = config.ajaxList[path].result;
        var res_body = JSON.parse(body);
        result.should.be.eql(res_body);
        done();
      });
    });

    it('should reject the post request in  config.json ', function(done) {
      request.post({
        url: 'http://localhost:3000/post',
        form: {
          groupId: '110'
        }
      }, function(err, res, body) {
        if (err) {
           console.log(err);
        }
        var path = res.req.path;
        var reject = config.ajaxList[path].reject;
        var res_body = JSON.parse(body);
        reject.should.be.eql(res_body);
        done();
      });
    });

    it('should response the query request in  config.json ', function(done) {
      var path = '/query';
      var query = config.ajaxList[path].query;
      var url = 'http://localhost:3000' + path + '?' + querystring.stringify(query);
      request.get(url, function(err, res, body) {
        if (err) {
          console.log(err);
        }
        var result = config.ajaxList[path].result;
        var res_body = JSON.parse(body);
        result.should.be.eql(res_body);
        done();
      });
    });

    it('should decodeURI path such as space', function(done) {
      var url = 'http://localhost:3000/fixture/shoud%20decode.html';
      var encodeUrl = encodeURI(url);
      request.get(encodeUrl, function(err) {
        should.not.exist(err);
        done();
      });
    });
  });
});
