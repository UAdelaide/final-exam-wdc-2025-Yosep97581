var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/api/dogs', function(req, res, next) {
  try {
    req.protocol.getConnection(function(err, connection) {
      if (err) {
        res.status(500).json
      }
    })
  }
});