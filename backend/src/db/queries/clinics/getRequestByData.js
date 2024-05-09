const db = require('../../connection');

const getRequest = (request_type, patient_id, doctor_id) => {
  const values = [request_type, patient_id, doctor_id ];
  const query = `
    SELECT *
    FROM pending_requests
    WHERE request_type = $1 AND patient_id = $2 AND doctor_id = $3;
  `
  return db.query(query, values)
    .then(results => {
      return results.rows[0];
    })
    .catch(error => console.log("getRequest error", error));
};

module.exports = { getRequest }