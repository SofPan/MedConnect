// GET Landing Page /

const express = require('express');
const { getUserById } = require('../src/db/queries/users/getUserById');
const router  = express.Router();
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ["somelongsecretkey987654321"],
}));

router.get('/', (req, res) => {
  const userId = req.session.user_id;
  console.log("UserId", userId)
  if (userId) {
    getUserById(userId)
      .then(user => {
        // Send the user information as JSON data to the frontend
        console.log(user)
        res.json(user);
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  } else {
    // If userId is not found in the session, send an error response
    res.status(401).json({ error: 'Unauthorized' });
  }
  
});

module.exports = router;