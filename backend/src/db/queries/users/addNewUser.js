// Register a new user

const db = require('../../connection');

const addNewUser = ({email, password, isClinic}) => {
  const values = [email, password, isClinic, new Date()];
  const query = `
  INSERT INTO users (email, password_hash, is_clinic, created_at) 
VALUES ($1, $2, $3, $4)
RETURNING *
;
  `;
  return db.query(query, values)
    .then(results => {
    console.log('DATABASE CALL');
      return results.rows[0];
    })
    .catch(error => console.log("addNewUser error", error));
};

module.exports = { addNewUser };