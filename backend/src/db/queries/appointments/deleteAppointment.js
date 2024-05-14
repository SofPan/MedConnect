// Delete appointment
const db = require('../../connection');

const deleteAppointment = (appointment_id) => {
  
  const values = [appointment_id];
  
  const query = `
    DELETE FROM appointments
    WHERE appointments.id = $1
    ;
  `

  return db.query(query, values)
  .then(data => {
    if (data.rowCount === 1) {
      // Deletion was successful
      return { success: true, message: `Appointment with ID ${appointment_id} deleted successfully` };
    } else {
      // No appointment was deleted (probably because it doesn't exist)
      return { success: false, message: `Appointment with ID ${appointment_id} not found` };
    }
  })
  .catch(error => {
    console.error('deleteAppointment query error:', error);
    return { success: false, message: 'Error deleting appointment' };
  });
}

module.exports = { deleteAppointment };