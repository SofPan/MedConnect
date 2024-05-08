const db = require('../../connection');



const addNewPatient = (info) => {
    const { user_id, name, DOB, gender, health_card } = info;
    const values = [user_id, name, DOB, gender, health_card]; 
    
    
    const query = `
    INSERT INTO patients (user_id, name, date_of_birth, gender, health_card, created_at)
    VALUES
        ($1, $2, $3, $4, $5, NOW())
    RETURNING *;
    `
    return db.query(query, values)
    .then(results => {
      console.log(results, 'add paitent results');
      return results.rows[0];
    })
    .catch(error => console.log("addNewUser error", error));
  };


  module.exports = { addNewPatient }
