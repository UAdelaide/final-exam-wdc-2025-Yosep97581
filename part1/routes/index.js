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

      const query = `
        SELECT WalkRequests.request_id, Dogs.name AS dog_name,
               WalkRequests.requested_time, WalkRequests.duration_minutes,
               WalkRequests.location, Users.username AS owner_username
        FROM WalkRequests
        JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
        JOIN Users ON Dogs.owner_id = Users.user_id
        WHERE WalkRequests.status = 'open'
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

router.get('/api/walkers/summary', function(req, res, next) {
  try {
    req.pool.getConnection(function(err, connection) {
      if (err) {
        res.status(500).json({ error: 'Database connection error'});
        return;
      }

      const query = `
        SELECT u.username AS walker_username,
                COUNT(r.rating_id) AS total_ratings,
                ROUND(AVG(r.rating), 1) AS average_rating,
                COUNT(DISTINCT wr.request_id) AS completed_walks
        FROM Users u
        LEFT JOIN WalkRatings r ON u.user_id = r.walker_id
        LEFT JOIN WalkRequests wr on u.user_id = wr.walker_id AND wr.status = 'completed'
        WHERE u.role = 'walker'
        GROUP BY u.user_id
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

router.post('/login', function(req,res) {
  const { username, password } = req.body;

  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.status(500).send('Database connection failed');
    }
  })
});