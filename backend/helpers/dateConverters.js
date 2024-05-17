const dateToString = (date) => {
  const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleString('en-us', options);
}

// const stringToDate = (dateString) => {
//   const dateObj = Date.parse(dateString);
//   return dateObj;
// }

// conversionType is either "to_string" or "to_date" correlating to dateToString and stringToDate respectively
const mapAndConvertAppointment = (appointmentData, conversionType) => {
  return appointmentData.map(appointment => {
    if (conversionType === "to_string") {
      appointment.start_time = dateToString(appointment.start_time);
      appointment.end_time = dateToString(appointment.end_time);
    }
    // if (conversionType === "to_date") {
    //   appointment.start_time = stringToDate(appointment.start_time);
    //   appointment.end_time = stringToDate(appointment.end_time);
    // }
    return appointment;
  });
}

module.exports = { mapAndConvertAppointment };