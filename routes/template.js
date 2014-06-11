var express = require('express');
var router = express.Router();
var template = require('../controllers/template')

router.get('/', template.index);
router.get('/push', template.push);
router.post('/uploadpic', template.uploadpic);
router.post('/publish', template.publish);
router.get('/project/:name/*?', template.project);
router.get('/project/:name', template.project);
module.exports = router;
