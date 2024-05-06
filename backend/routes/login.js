// GET login page /login

// GET User Login /login/:id

// POST logout /logout
const { getUserById } = require('../src/db/queries/users/getUserById');
const { getUserByEmail } = require('../src/db/queries/users/getUserByEmail');

const express = require('express');
const router  = express.Router();




router.post('/login', async (req, res) => {

  

  const { email, password } = req.body;
  
  
  try {

    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    // const passwordMatch = await bcrypt.compare(password, user.password);

    if (password !== user.password_hash) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    //set cookie in browser on login
  
    // Password is correct, send user information as JSON data to the frontend
   

    res.json(user);

  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/login/:id', (req, res) => {
  
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
  console.log("logout")
});


module.exports = router;
