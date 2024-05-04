// Delete existing doctor
const db = require('../../connection');

const deleteDoctor = (id) => {
  const value = [id]
  const query = `
    DELETE FROM doctors
    WHERE id = $1;
  `;

  return db.query(query, value)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => console.error('addNewDoctor query error:', error));
}

module.exports = { deleteDoctor }