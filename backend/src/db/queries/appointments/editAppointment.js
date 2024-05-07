// Edit appointment
/*
  Intended to be used on Patient side
  when booking or cancelling appointment
  So that it re-opens on clinic side
  if cancelled
*/

const editAppointment = (appointment) => {
  const values = [
    appointment.id, // $1
    appointment.patient_id, // $2
    appointment.doctor_id, // $3
    appointment.clinic_id, // $4
    appointment.details //$5
  ]

  const query = `
    UPDATE appointments
    SET patient_id = $2, doctor_id = $3, clinic_id = $4, details = $5
    WHERE appointments.id = $1;
  `

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.error('editAppointment query error:', error));
}

module.exports = { editAppointment };