// Get user by id on successful login

const db = require('../../connection');

const getUserByEmail = (email) => {
  const values = [email];
  const query = `
  SELECT  *
  FROM users
  WHERE users.email = $1;
  `;
  return db.query(query, values)
    .then(results => {
      console.log(results.rows[0])
      return results.rows[0];
    })
    .catch(error => console.log("getUserByEmail error", error));
};

module.exports = { getUserByEmail };
