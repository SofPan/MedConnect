const db = require('../../connection');

const getClinicIdbyName = (name) => {
  const values = [name];
  const query = `
    SELECT *
    FROM clinics
    WHERE name = $1;
  `
  return db.query(query, values)
    .then(results => {
      return results.rows[0];
    })
    .catch(error => console.log("getClinicIDByName error", error));
};

module.exports = { getClinicIdbyName }