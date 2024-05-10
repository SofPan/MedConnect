

const db = require('../../connection');

const getAllDoctorsByClinicID = (id) => {
  const values = [id];
  const query = `
  SELECT * 
  FROM doctors
  WHERE clinic_id = $1;`;
  return db.query(query, values)
    .then(results => {
      return results.rows;
    })
    .catch(error => console.log("getAllDoctors error", error));
};
module.exports = { getAllDoctorsByClinicID };
