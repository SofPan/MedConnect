// Get user by id on successful login

const db = require('../../connection');

const getCalendarByClinicId = (clinic_id) => {
  const values = [clinic_id];
  const query = `
  SELECT  *
  FROM appointments
  WHERE clinic_id = $1;
  `;
  return db.query(query, values)
    .then(results => {
      console.log(results.rows[0])
      return results.rows[0];
    })
    .catch(error => console.log("getCalendarByClinicId error", error));
};

module.exports = { getCalendarByClinicId };
