// Add a new document
const db = require('../../connection');

const addNewDocument = (document) => {
  const value = [
    document.patient_id, // $1
    document.document_name, // $2
    document.document_url, // $3
  ]
  const query = `
    INSERT INTO documents (patient_id, document_name, document_url, created_at) VALUES
    ($1, $2, $3, NOW())
    RETURNING *;
  `;

  return db.query(query, value)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.error('addNewDocument query error:', error));
}

module.exports = { addNewDocument }