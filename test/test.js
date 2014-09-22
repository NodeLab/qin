var assert = require("assert"),
    fs = require('fs');


describe('Utils', function(){

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

        assert("true", changed.t)
        done()
      });


  	})
  })
})