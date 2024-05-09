// Show one appointment

const db = require('../../connection');

const getAppointmentById = (appointment_id) => {
  const values = [appointment_id];
  const query = `
  SELECT  *
  FROM appointments
  WHERE id = $1;
  `;
  return db.query(query, values)
    .then(results => {
      console.log("results", results.rows);
      return results.rows[0];
    })
    .catch(error => console.log("getCalendarByClinicId error", error));
};

module.exports = { getAppointmentById };