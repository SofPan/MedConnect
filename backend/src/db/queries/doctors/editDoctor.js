// Edit existing doctor
const db = require('../../connection');

const editDoctor = (doctor) => {
  const value = [
    doctor.id, // $1
    doctor.name, //$2
    doctor.qualifications, // $3
    doctor.description, // $4
    doctor.photo_url, // $5
    doctor.number_of_patients // $6
  ]
  const query = `
    UPDATE doctors
    SET name = $2, qualifications = $3, description = $4, photo_url = $5, number_of_patients = $6
    WHERE doctors.id = $1;
  `;

  return db.query(query, value)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.error('editDoctor query error:', error));
}

module.exports = { editDoctor }