const db = require('../../connection');

const addRequest = (requestData) => {
  const { request_type, patient_id, clinic_id, doctor_id, appointment_id } = requestData;
  const values = [request_type, patient_id, clinic_id, doctor_id, appointment_id];
  const query = `
  INSERT INTO pending_requests (request_type, patient_id, clinic_id, doctor_id, appointment_id) 
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  ;`;

  return db.query(query, values)
    .then(results => {
      return results.rows[0];
    })
    .catch(error => console.log("addRequest error", error));
};

module.exports = { addRequest };