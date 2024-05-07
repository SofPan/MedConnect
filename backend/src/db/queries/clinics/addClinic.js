const { geocodeAddress } = require('../../../../helpers/geocodeAdress');
const db = require('../../connection');

const addClinic = (clinicData) => {
  const { name, user_id, address } = clinicData;

  return geocodeAddress(address)
    .then(({ lat, lng }) => {
      const query = `
        INSERT INTO clinics (name, user_id, address, latitude, longitude)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;

      const values = [name, user_id, address, lat, lng];

      return db.query(query, values);
    })
    .then(result => {
      return result.rows[0];
    })
    .catch(error => {
      console.error('Error adding clinic:', error);
      throw new Error('Error adding clinic');
    });
};

module.exports = { addClinic };