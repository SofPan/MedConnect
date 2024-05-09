// Show all unbooked appointments by clinic id
const db = require('../../connection');

const getClinicsOpenAppointments = (clinic_id) => {
  console.log("query reached")
  const values = [clinic_id];

  const query = `
    SELECT *
    FROM appointments
    WHERE clinic_id = $1
    AND patient_id IS NULL;
  `

  return db.query(query, values)
    .then(data => {
      return data.rows;
    })
    .catch(error => console.error('getClinicsOpenAppointments query error:', error));
}

module.exports = { getClinicsOpenAppointments }