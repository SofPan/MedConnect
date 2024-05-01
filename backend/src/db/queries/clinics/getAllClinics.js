const db = require('../../connection');

const getAllClinics = () => {
  const query = `
  SELECT clinics.name as name, clinics.address as address, SUM(doctors.number_of_patients) as number_of_spots
  FROM clinics 
  LEFT JOIN doctors 
  ON clinics.id = doctors.clinic_id
  GROUP BY clinics.name, address;`;
  return db.query(query)
    .then(results => {
      console.log(results.rows)
      return results.rows;
    })
    .catch(error => console.log("getAllClinics error", error));
};

module.exports = { getAllClinics };
