const db = require('../../connection');

const getRequestByClinic = (clinic_id) => {
  const values = [clinic_id];
  const query = `
    SELECT *
    FROM pending_requests
    WHERE clinic_id = $1;
  `
  return db.query(query, values)
    .then(results => {
      return results.rows;
    })
    .catch(error => console.log("getRequest error", error));
};

module.exports = { getRequestByClinic }