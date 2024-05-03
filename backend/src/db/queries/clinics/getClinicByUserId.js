const db = require('../../connection');

const getClinicByUserId = (id) => {
  const values = [id];
  const query = `
    SELECT *
    FROM clinics
    WHERE user_id = $1;
  `
  return db.query(query, values)
    .then(results => {
      return results.rows[0];
    })
    .catch(error => console.log("getClinicByUserId error", error));
};

module.exports = { getClinicByUserId }