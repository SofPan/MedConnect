// Get all of a Patient's appointments
const db = require('../../connection');

const getAllAppointmentsByPatient = (patientId) => {
  const value = [patientId]
  // appointments.id, patient_id, appointments.start_time, appointments.end_time, appointments.status
  const query = `
    SELECT appointments.*, doctors.name as doctor_name, clinics.address as clinic_address
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