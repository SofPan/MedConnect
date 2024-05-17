const db = require('../../connection');

const getPatientById = (id) => {
  const values = [id];
  const query = `
    SELECT *
    FROM patients
    WHERE id = $1;
  `
  return db.query(query, values)
    .then(results => {
      console.log("results", results.row);
      return results.rows[0];
    })
    .catch(error => console.log("getPatientById error", error));
};



module.exports = { getPatientById }