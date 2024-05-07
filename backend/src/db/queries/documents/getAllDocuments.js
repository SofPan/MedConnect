// Get all documents by patient id

const db = require('../../connection');

const getAllDocuments = () => {
  const query = `
  SELECT * 
  FROM documents;`;
  return db.query(query)
    .then(results => {
      return results.rows;
    })
    .catch(error => console.log("getAllDocuments error", error));
};
module.exports = { getAllDocuments };
