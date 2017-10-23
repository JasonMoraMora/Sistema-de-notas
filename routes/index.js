var express = require('express');
var router = express.Router();
var bd = require('./bd');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
