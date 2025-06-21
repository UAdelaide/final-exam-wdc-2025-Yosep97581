var express = require('express');
var router = express.Router();
const db = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/api/dogs', async function (req, res, next) {
  try {
    const [rows] = await db.query(`
      SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username
      FROM Dogs
      JOIN Users ON Dogs.owner_id = Users.user_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected error on server' });
  }
});

router.get('/api/walkrequests/open', async function (req, res, next) {
  try {
    const [rows] = await db.query(`
        SELECT WalkRequests.request_id, Dogs.name AS dog_name,
               WalkRequests.requested_time, WalkRequests.duration_minutes,
               WalkRequests.location, Users.username AS owner_username
        FROM WalkRequests
        JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
        JOIN Users ON Dogs.owner_id = Users.user_id
        WHERE WalkRequests.status = 'open'
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected error on server' });
  }
});

router.get('/api/walkers/summary', async function (req, res, next) {
  try {
    const [rows] = await db.query(`
        SELECT
          u.username AS walker_username,
          COUNT(r.rating_id) AS total_ratings,
          ROUND(AVG(r.rating), 1) AS average_rating,
          COUNT(r.request_id) AS completed_walks
        FROM Users u
        LEFT JOIN WalkRatings r ON u.user_id = r.walker_id
        WHERE u.role = 'walker'
        GROUP BY u.user_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected error on server' });
  }
});
