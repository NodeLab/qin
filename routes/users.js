var express = require('express');
var router = express.Router();
var user = require('../controllers/user')
/* GET users listing. */
//router.get('/',user.intro);
router.post('/',user.intro);
module.exports = router;
