var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/api/dogs', function(req, res, next) {
  try {
    req.pool.getConnection(function(err, connection) {
      if (err) {
        res.status(500).json({ error: 'Database connection error'});
        return;
      }

      const query = `
        SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username
        FROM Dogs
        JOIN Users ON Dogs.owner_id = Users.user_id
      `;

      connection.query(query, function(queryErr, rows) {
        connection.release();
        if (queryErr) {
          res.status(500).json({ error: 'Query error' });
        } else {
          res.json(rows);
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Unexpected error on server' });
  }
});

router.get('/api/walkrequests/open', function(req, res, next) {
  try {
    req.pool.getConnection(function(err, connection) {
      if (err) {
        res.status(500).json({ error: 'Database connection error'});
        return;
      }
    });
  }
});