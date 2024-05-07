// Get all of a Patient's appointments
const db = require('../../connection');

const getAllAppointmentsByPatient = (patientId) => {
  console.log("get patient ID", patientId);
  const value = [patientId]
  const query = `
    SELECT patient_id, doctors.name as doctor_name, clinics.address as clinic_address
    FROM appointments
    JOIN doctors ON appointments.doctor_id = doctors.id
    JOIN clinics ON appointments.clinic_id = clinics.id
    WHERE patient_id = $1;
  `;

  return db.query(query, value)
    .then(results => {
      return results.rows;
    })
    .catch(error => console.log("getAllAppointmentsByPatient query error", error));
};

module.exports = { getAllAppointmentsByPatient }