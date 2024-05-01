// GET login page /login

// GET User Login /login/:id

// POST logout /logout
const { getUserById } = require('../src/db/queries/users/getUserById');
const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ["somelongsecretkey987654321"],
}));

router.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  const userId = req.session.user_id;
  getUserById(userId)
      .then(user => {
        // Send the user information as JSON data to the frontend
        res.json(user);
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
});

router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
