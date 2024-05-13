const express = require('express');
const { getAllDoctors } = require('../src/db/queries/doctors/getAllDoctors');
const { getOneDoctor } = require('../src/db/queries/doctors/getOneDoctor');
const { addNewDoctor } = require('../src/db/queries/doctors/addNewDoctor');
const { deleteDoctor } = require('../src/db/queries/doctors/deleteDoctor');
const { editDoctor } = require('../src/db/queries/doctors/editDoctor');
const { getAllDoctorsByClinicID } = require('../src/db/queries/doctors/getAllDoctorsByClinicID');

const router = express.Router();

// GET all doctors /doctors
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

// GET all doctors by clinic id

router.get('/:id', (req, res) => {

  const clinicId = req.params.id;
  getAllDoctorsByClinicID(clinicId)
    .then(data => {

      res.json(data);
    })
    .catch(error => {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// GET one doctor /doctors/:id
router.get('/single/:id', (req, res) => {
  const doctorId = req.params.id;
  getOneDoctor(doctorId)
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
    .then(result => {
      return result;
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: error.message });
    });
})

// PUT Edit existing doctor /doctors/:id
router.put('/:id', (req, res) => {
  editDoctor(req.body)
    .then(result => {
      return result;
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: error.message });
    });
})

// DELETE Delete existing doctor /doctors/:id/delete
router.delete('/:id/delete', (req, res) => {
  deleteDoctor(req.params.id)
    .then(result => {
      return result;
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: error.message });
    });
})

module.exports = router;