// Get all doctors by clinic id

const db = require('../../connection');

const getAllDoctors = () => {
  const query = `
  SELECT * 
  FROM doctors;`;
  return db.query(query)
    .then(results => {
      return results.rows;
    })
    .catch(error => console.log("getAllDoctors error", error));
};
module.exports = { getAllDoctors };
