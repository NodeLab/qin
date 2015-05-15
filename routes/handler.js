var express = require('express');
var router  = express.Router();

router.all('*', function(req, res, next) {
  res.send('不好意思，这个，真没有\n温馨提示：若需开启代理，请配置config.json中apiPath.status');
});
module.exports = router;