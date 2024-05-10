const express = require('express');
const { addRequest } = require('../src/db/queries/clinics/addRequest');
const { getRequest } = require('../src/db/queries/clinics/getRequestByData');
const { getRequestByClinic } = require('../src/db/queries/clinics/getRequestByClinic');
const router = express.Router();

router.get('/:id', (req, res) => {
  const clinicId = req.params.id;
  getRequestByClinic(clinicId)
    .then(response => res.json(response))
    .catch(error => {
      console.error('Error fetching requests:', error);
      res.status(500).json({ error: 'Internal server error' });
    })
});

router.post('/', (req, res) => {
  const requestData = {
    request_type: req.body.request_type,
    patient_id: req.body.patient_id,
    clinic_id: req.body.clinic_id,
    doctor_id: req.body.doctor_id,
    appointment_id: req.body.appointment_id
  }

  getRequest(requestData.request_type, requestData.patient_id)
    .then(request => {
      if (request) {
        res.json({ message: "The request has already been sent" });
      } else {
        addRequest(requestData)
          .then(request => {
            res.json(request);
          })
      }
    })
    .catch(error => {
      console.error('Error adding request:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});



module.exports = router;