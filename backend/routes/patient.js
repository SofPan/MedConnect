
const express = require('express');
const { getPatientByUserId } = require('../src/db/queries/patients/getPatientByUserId');
const { editPatient } = require('../src/db/queries/patients/editPatient');
const { getPatientsByClinicId } = require('../src/db/queries/patients/getPatientsByClinicId');
const { getPatientById } = require('../src/db/queries/patients/getPatientById');
const router = express.Router();


router.get('/clinic/:id', (req, res) => {
  const clinicId = req.params.id
  getPatientsByClinicId(clinicId)
    .then(patients => {
      res.status(200).json(patients)
    })
    .catch(err => {
      console.error("Error retrieving patient data:", err);
      res.sendStatus(500);
    });
});

router.get('/patient/:id', (req, res) => {
  const patientId = req.params.id
  getPatientById(patientId)
    .then(patient => {
      res.status(200).json(patient)
    })
    .catch(err => {
      console.error("Error retrieving patient data:", err);
      res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
  const userId = req.params.id
  getPatientByUserId(userId)
    .then(patient => {
      res.status(200).json(patient)
    })
    .catch(err => {
      console.error("Error retrieving patient data:", err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const patient = req.body
  editPatient(patient)
    .then(result => {
      console.log("result", result);
      return result;
    })
    .catch(err => {
      console.error("Error retrieving patient data:", err);
      res.sendStatus(500);
    });
});



module.exports = router;