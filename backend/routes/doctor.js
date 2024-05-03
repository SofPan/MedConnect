const express = require('express');
const { getAllDoctors } = require('../src/db/queries/doctors/getAllDoctors');
const { addNewDoctor } = require('../src/db/queries/doctors/addNewDoctor')
const router = express.Router();

// GET all doctors /doctors
// Filter query to relate doctors to the current clinic
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

// POST create a new doctor entry /doctors
router.post('/', (req, res) => {
  addNewDoctor(req.body)
    .catch(error => {
      console.error("post new doctor error:", error);
      res.status(500);
    });
})
// GET one doctor /doctors/:id

// PUT Edit existing doctor /doctors/:id

// DELETE Delete existing doctor /doctors/:id/delete

module.exports = router;