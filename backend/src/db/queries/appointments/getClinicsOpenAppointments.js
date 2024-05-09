// Show all unbooked appointments by clinic id
const db = require('../../connection');

const getClinicsOpenAppointments = (clinic_id) => {
  const values = [clinic_id];

  const query = `
    SELECT *
    FROM appointments
    WHERE clinic_id = $1
    AND patient_id = null;
  `

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.error('getClinicsOpenAppointments query error:', error));
}

module.exports = { getClinicsOpenAppointments }