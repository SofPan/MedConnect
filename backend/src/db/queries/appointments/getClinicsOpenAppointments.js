// Show all unbooked appointments by clinic id
const db = require('../../connection');

const getClinicsOpenAppointments = (doctor_id) => {
  console.log("query reached")
  const values = [doctor_id];

  const query = `
    SELECT appointments.*
    FROM appointments
    JOIN clinics ON appointments.clinic_id = clinics.id
    WHERE appointments.patient_id IS NULL
    AND appointments.doctor_id = $1;
  `

  return db.query(query, values)
    .then(data => {
      return data.rows;
    })
    .catch(error => console.error('getClinicsOpenAppointments query error:', error));
}

module.exports = { getClinicsOpenAppointments }