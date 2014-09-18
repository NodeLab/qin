var assert = require("assert")

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
  describe('auto reload', function() {
  	it('should auto reload config.json', function(done){
  		var fs = require('fs');
  		var src = config = require('../utils/getConfig').config();
  		//修改文件
      
  		fs.writeFile('../config.json', JSON.stringify({}))
      config = require('../utils/getConfig').config();
      config = {}
      console.log('config', config)
      fs.writeFile('../config.json', JSON.stringify({}));
      done()
  		//重新
  		//判断
  	})
  })
})