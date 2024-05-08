const db = require('../../connection');

const getPatientByUserId = (id) => {
  const values = [id];
  const query = `
    SELECT *
    FROM patients
    WHERE user_id = $1;
  `
  return db.query(query, values)
    .then(results => {
      console.log("results", results.row);
      return results.rows[0];
    })
    .catch(error => console.log("getPatientByUserId error", error));
};

module.exports = { getPatientByUserId }