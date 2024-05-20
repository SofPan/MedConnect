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
const { deleteAppointment } = require("../src/db/queries/appointments/deleteAppointment");
const { getClinicsOpenAppointments } = require('../src/db/queries/appointments/getClinicsOpenAppointments');
const { mapAndConvertAppointment } = require('../helpers/dateConverters');

router.get('/single/:id', (req, res) => {

  const appointment_id = req.params.id;
  getAppointmentById(appointment_id)
    .then(appointment => {

      if (!appointment) {
        // If no calendar is found for the given clinic ID, return a 404 response
        return res.status(404).json({ error: 'Appointment not found' });
      }
      // Convert the date to locale string
      appointment = mapAndConvertAppointment([appointment], "to_string")[0];
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
    .then(appointmentData => {
      const convertedData = mapAndConvertAppointment(appointmentData, "to_string");
      res.json(convertedData);
      // res.json(appointmentData);
    }).catch(error => {
      console.error("Error fetching patient's appointments: ", error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


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

router.delete('/:id', (req, res) => {
  const appointmentId = req.params.id;

  deleteAppointment(appointmentId)
    .then(success => {
      if (!success) {
        // If no appointment is found for the given ID, return a 404 response
        return res.status(404).json({ error: 'Appointment not found' });
      }

      // If appointment is found and deleted successfully, send a success message
      res.status(200).json({ message: 'Appointment deleted successfully' });
    })
    .catch(error => {
      console.error('Error deleting appointment:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});



// Get open appointments by clinic id
router.get("/open/:id", (req, res) => {
  const doctorId = req.params.id;
  getClinicsOpenAppointments(doctorId)
    .then(appointmentData => {
      const convertedData = mapAndConvertAppointment(appointmentData, "to_string");
      res.json(convertedData);
      // res.json(appointmentData)
    })
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
  // const convertedData = mapAndConvertAppointment([req.body], "to_date");
  // console.log("convertedData", convertedData);
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