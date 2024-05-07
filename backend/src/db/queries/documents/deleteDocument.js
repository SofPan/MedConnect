// Delete a document
// Delete existing doctor
const db = require('../../connection');

const deleteDocument = (id) => {
  const value = [id]
  const query = `
    DELETE FROM documents
    WHERE id = $1;
  `;

  return db.query(query, value)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.error('deleteDocument query error:', error));
}

module.exports = { deleteDocument }