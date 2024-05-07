// GET Display all of a clinic's appointments /appointments 

// POST create new appointment /appointments

// GET one appointment /appointment/:id

// DELETE delete appointment /appointment/:id/delete
// Used only on clinic side to delete appointment slot entirely
const express = require('express');
const router = express.Router();

const { getAllAppointmentsByPatient } = require('../src/db/queries/appointments/getAllAppointmentsByPatient');
const { editAppointment } = require('../src/db/queries/appointments/editAppointment');

// Get appointments by patient id
router.get("/patients/:id", (req, res) => {
  const patientId = req.params.id;
  getAllAppointmentsByPatient(patientId)
    .then(appointmentData => res.json(appointmentData))
    .catch(error => {
      console.error("Error fetching patient's appointments: ", error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// PUT edit appointment /appointment/:id
/*
  Intended to be used on Patient side
  when booking or cancelling appointment
  So that it re-opens on clinic side
  if cancelled
*/
router.put("/:id", (req, res) => {
  editAppointment(req.body)
    .then(result => {
      return result;
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: error.message });
    });
});


module.exports = router;