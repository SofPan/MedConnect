const db = require('../../connection');

const getClinicByUserId = (id) => {
  console.log("inside getClinicByUserId", id);
  const values = [id];
  const query = `
    SELECT *
    FROM clinics
    WHERE user_id = $1;
  `
  return db.query(query, values)
    .then(results => {
      console.log("clinics", results.rows[0])
      return results.rows[0];
    })
    .catch(error => console.log("getClinicByUserId error", error));
};

module.exports = { getClinicByUserId }