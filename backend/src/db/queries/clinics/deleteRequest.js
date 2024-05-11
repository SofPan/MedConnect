// Delete existing doctor
const db = require('../../connection');

const deleteRequest = (id) => {
  const value = [id]
  const query = `
    DELETE FROM pending_requests
    WHERE id = $1;
  `;

  return db.query(query, value)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.error('deleteRequest query error:', error));
}

module.exports = { deleteRequest }