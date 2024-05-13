// GET Display all of a clinic's appointments /appointments 

// POST create new appointment /appointments

// GET one appointment /appointment/:id

// DELETE delete appointment /appointment/:id/delete
// Used only on clinic side to delete appointment slot entirely
const express = require('express');
const router = express.Router();

const { getAllAppointmentsByPatient } = require('../src/db/queries/appointments/getAllAppointmentsByPatient');
const { editAppointment } = require('../src/db/queries/appointments/editAppointment');
const { getCalendarByClinicId } = require("../src/db/queries/calendar/getCalendarByClinicId");
const { getAppointmentById } = require("../src/db/queries/appointments/getAppointmentById");

router.get('/single/:id', (req, res) => {

  const appointment_id = req.params.id;
  getAppointmentById(appointment_id)
    .then(appointment => {

      if (!appointment) {
        // If no calendar is found for the given clinic ID, return a 404 response
        return res.status(404).json({ error: 'Appointment not found' });
      }

      // If calendar is found, return it as JSON response

      res.json(appointment);
    })
    .catch(error => {
      console.error('Error fetching user information:', error);
      res.status(500).json({ error: 'Internal server error' });
    });

});

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
const { getClinicsOpenAppointments } = require('../src/db/queries/appointments/getClinicsOpenAppointments');

router.get('/:id', (req, res) => {

  const clinicId = req.params.id;

  getCalendarByClinicId(clinicId)
    .then(calendar => {

      if (!calendar) {
        // If no calendar is found for the given clinic ID, return a 404 response
        return res.status(404).json({ error: 'Calendar not found' });
      }

      // If calendar is found, return it as JSON response

      res.json(calendar);
    })
    .catch(error => {
      console.error('Error fetching user information:', error);
      res.status(500).json({ error: 'Internal server error' });
    });

});



// Get open appointments by clinic id
router.get("/open/:id", (req, res) => {
  const doctorId = req.params.id;
  getClinicsOpenAppointments(doctorId)
    .then(appointmentData => res.json(appointmentData))
    .catch(error => {
      console.error("Error fetching clinics's open appointments: ", error);
      res.status(500).json({ error: 'Internal server error' });
    });
})

// PUT edit appointment /appointment/:id
/*
  Intended to be used on Patient side
  when booking or cancelling appointment
  So that it re-opens on clinic side
  if cancelled
*/


router.put("/:id", (req, res) => {
  console.log('yoo');
  editAppointment(req.body)
    .then(result => {
      console.log("edited appointment", result);
      return result;
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: error.message });
    });
});






module.exports = router;