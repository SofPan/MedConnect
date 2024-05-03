// GET Registration Page /register

// POST Submit Registration /register

// GET Info collection page /register/info

// POST Submit info page form /register/info
// The info collected changes the query based on Clinic vs. Patient
const express = require('express');
const router  = express.Router();

router.post('/', async (req, res) => {

    const { email, password, firstName, lastName} = req.body;
    
    console.log(email,password, "email and password")
    
    ;
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
  
      // Password is correct, send user information as JSON data to the frontend
      res.json(user);
  
    } catch (error) {
      console.error('Error fetching user information:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;