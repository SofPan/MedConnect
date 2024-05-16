const db = require('../../connection');

const getPatientsByClinicId = (id) => {
  const values = [id];
  const query = `
  SELECT patients.*, doctors.name as doctor
  FROM patients
  JOIN doctors ON patients.doctor_id = doctors.id
  JOIN clinics ON doctors.clinic_id = clinics.id
  WHERE clinics.id = $1;
  `
  return db.query(query, values)
    .then(results => {
      return results.rows;
    })
    .catch(error => console.log("getPatientByUserId error", error));
};



module.exports = { getPatientsByClinicId }