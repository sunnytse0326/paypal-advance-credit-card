var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('spb-ucc-vault', { title: 'UCC Vault' });
});

module.exports = router;
