
const express = require('express');
const { getPatientByUserId } = require('../src/db/queries/patients/getPatientByUserId');
const router  = express.Router();


  router.put('/:id', (req, res) => {
    const doctorId = req.body.doctor_id
    const patientId = req.params.id
    getPatientByUserId(patientId)
     .then(patient => {
      console.log("doctor id ", patient.doctor_id)
      if(patient.doctor_id) {
        return res.status(409).json({error: "Patient already has a doctor."})
      }
     })
     .catch(err => {
      console.error("Error retrieving patient data:", err);
      res.sendStatus(500);
    });
  });



module.exports = router;