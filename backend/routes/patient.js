
const express = require('express');
const { getPatientByUserId } = require('../src/db/queries/patients/getPatientByUserId');
const { editPatient } = require('../src/db/queries/patients/editPatient');
const router = express.Router();

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