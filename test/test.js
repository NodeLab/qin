var assert = require("assert"),
  fs = require('fs'),
  app = require('../app'),
  request = require('request'),
  config = require('../utils/getConfig').config();
 


describe('Utils', function() {

  describe('auto reload config.json', function() {

    var config = require('../utils/getConfig').config();
    var src = {};

    for (var i in config) {
      src[i] = config[i];
    }
    after(function() {
      fs.writeFile('config.json', JSON.stringify(src, null, "    "));
    });


  	it('should update reload', function(done){
      config.t = 'changed'
  		fs.writeFile('config.json', JSON.stringify(config), function(err) {
        if (err) console.log(err);

        var changed = require('../utils/getConfig').config();

        assert.equal("changed", changed.t)
        done()
      });


    })
  })

})
describe('Routes', function() {
  describe('console req', function() {
    var sever;
    before(function() {
      sever=app.listen(3000);
    })
    after(function() {
      sever.close();
    })
    it('should ', function(done) {
      request.get('http://localhost:3000/prize/ajax/prizeDraw?groupId=198', function(err,res, body) {
        assert(config.ajaxList[res.req.path])
        done();
      });
    })


  })
})


