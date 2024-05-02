// GET all doctors /doctors
// Filter query to relate doctors to the current clinic

// POST create a new doctor entry /doctor

// GET one doctor /doctor/:id

// PUT Edit existing doctor /doctor/:id

// DELETE Delete existing doctor /doctor/:id/delete

const express = require('express');
const { getAllDoctors } = require('../src/db/queries/doctors/getAllDoctors');
const router  = express.Router();

router.get('/', (req, res) => {
  getAllDoctors()
   .then(data => {
     res.json(data);
   })
   .catch(error => {
     console.error('Error fetching doctors:', error);
     res.status(500).json({ error: 'Internal server error' });
   });
});

module.exports = router;