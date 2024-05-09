const express = require('express');
const { addRequest } = require('../src/db/queries/clinics/addRequest');
const router  = express.Router();


  router.post('/', (req, res) => {
    const requestData = {
      request_type: req.body.request_type,
      patient_id: req.body.patient_id,
      clinic_id: req.body.clinic_id,
      doctor_id: req.body.doctor_id,
      appointment_id: req.body.appointment_id
    }
   addRequest(requestData)
    .then(request => {
      console.log(request)
      res.json(request);
    })
    .catch(error => {
      console.error('Error adding request:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
  });



module.exports = router;