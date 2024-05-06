// Create new doctor
const db = require('../../connection');

const addNewDoctor = (doctor) => {
  const value = [
    doctor.clinic_id, // $1
    doctor.name, // $2
    "General Medicine", // $3
    doctor.qualifications, // $4
    doctor.description, // $5
    doctor.photo_url, // $6
    doctor.number_of_patients // $7
  ]
  const query = `
    INSERT INTO doctors (clinic_id, name, specialty, qualifications, description, photo_url, number_of_patients, created_at) VALUES
    ($1, $2, $3, $4, $5, $6, $7, NOW())
    RETURNING *;
  `;

  return db.query(query, value)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.error('addNewDoctor query error:', error));
}

module.exports = { addNewDoctor }