// Edit appointment
/*
  Intended to be used on Patient side
  when booking or cancelling appointment
  So that it re-opens on clinic side
  if cancelled
*/
const db = require('../../connection');

const editAppointment = (appointment) => {
  const values = [
    appointment.id, // $1
    appointment.patient_id, // $2
    appointment.doctor_id, // $3
    appointment.clinic_id, // $4
    appointment.start_time, //$5
    appointment.end_time, //$6
    appointment.status, //$7
    appointment.patient_name //$8

  ]

  const query = `
    UPDATE appointments
    SET patient_id = $2, 
      doctor_id = $3, 
      clinic_id = $4, 
      start_time = $5,
      end_time = $6,
      status = $7,
      patient_name = $8
    WHERE appointments.id = $1;
  `

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.error('editAppointment query error:', error));
}

module.exports = { editAppointment };