// GET Registration Page /register

// POST Submit Registration /register

// GET Info collection page /register/info

// POST Submit info page form /register/info
// The info collected changes the query based on Clinic vs. Patient
const express = require('express');
const router  = express.Router();
const { getUserByEmail } = require('../src/db/queries/users/getUserByEmail');
const { addNewUser } = require("../src/db/queries/users/addNewUser")

router.post('/', async (req, res) => {

    const { email, password, type} = req.body;

    const newUser = {
        email,
        password,
    }

    type === "clinic" ? newUser.isClinic = true : newUser.isClinic = false;

    console.log(newUser);
    
    try {

      const user = await getUserByEmail(email);
      
      if (!user) {
        console.log("Function triggered");
        addNewUser(newUser)
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