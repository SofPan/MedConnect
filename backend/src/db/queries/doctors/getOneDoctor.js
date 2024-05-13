// Get a single doctor by ID
// Get all doctors by clinic id

const db = require('../../connection');

const getOneDoctor = (doctorId) => {
  const values = [doctorId]
  const query = `
  SELECT * 
  FROM doctors
  WHERE id = $1
  ;`;
  return db.query(query, values)
    .then(results => {
      return results.rows[0];
    })
    .catch(error => console.log("getOneDoctor error", error));
};
module.exports = { getOneDoctor };
