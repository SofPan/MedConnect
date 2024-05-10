// Edit existing patient
const db = require('../../connection');

const editPatient = (patient) => {
  const values = [
    patient.name, //$1
    patient.date_of_birth, // $2
    patient.doctor_id, // $3
    patient.id //$4
  ]
  const query = `
    UPDATE patients
    SET name = $1, date_of_birth = $2, doctor_id = $3
    WHERE patients.id = $4;
  `;

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.error('editPatient query error:', error));
}

module.exports = { editPatient }