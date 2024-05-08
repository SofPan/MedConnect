const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../src/db/queries/users/getUserByEmail');
const { addNewUser } = require("../src/db/queries/users/addNewUser");
const { addNewPatient } = require('../src/db/queries/patients/addNewPatient');


router.post('/', async (req, res) => {
  const { email, password, type } = req.body;
  const newUser = { email, password };

  newUser.isClinic = type === "clinic";

  try {
    // Check if the user already exists
    const user = await getUserByEmail(email);

    if (user) {
      
      res.status(400).json({ error: 'User already exists' });
    } else {
      
      const newUserResponse = await addNewUser(newUser);
      
      res.status(200).json(newUserResponse);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/info', async (req, res) => {

  const { name, gender, health_card, DOB, user_id } = req.body;
  const newUserInfo = { name, gender, health_card, DOB, user_id};

 

  try {
    // Check if the user already exists
   
      const newPatientResponse = await addNewPatient(newUserInfo);
      console.log(newPatientResponse, "register new");
      res.status(200).json(newPatientResponse);
    
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
