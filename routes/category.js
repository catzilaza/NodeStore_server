var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('category', { title: 'Category สวัสดีจ้า' });
});

module.exports = router;