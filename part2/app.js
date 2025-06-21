const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/owner-dashboard.html', (req, res, next) => {
    if(!req.session.user || req.session.user.role !== 'owner') {
        return res.redirect('/');
    }
    return next();
});

app.get('/walker-dashboard.html', (req, res, next) => {
    if(!req.session.user || req.session.user.role !== 'walker') {
        return res.redirect('/');
    }
    return next();
});

app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;