// Show one appointment

const db = require('../../connection');

const getAppointmentById = (appointment_id) => {
  const values = [appointment_id];
  const query = `
  SELECT appointments.*, clinics.address
  FROM appointments
  INNER JOIN clinics ON appointments.clinic_id = clinics.id
  WHERE appointments.id = $1;
`;
  return db.query(query, values)
    .then(results => {
      return results.rows[0];
    })
    .catch(error => console.log("getCalendarByClinicId error", error));
};

module.exports = { getAppointmentById };