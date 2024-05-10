import { useEffect, useState } from "react";
import { fetchOneAppointment } from "../../hooks/tempUseAPI";

const formatDateAndTime = (date) => {
  return date.replace(":00.000Z", "").split("T");
}

const AppointmentNotification = (props) => {
  const {appointment_id} = props;

  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    const getAppointmentDetails = async () => {
      const appointmentData = await fetchOneAppointment(appointment_id);
      setAppointment(appointmentData);
    }

    getAppointmentDetails();
  }, [])

  const dateString = `${formatDateAndTime(appointment.start_time)[0]} from ${formatDateAndTime(appointment.start_time)[1]} - ${formatDateAndTime(appointment.end_time)[1]}`


  return(
    <span>
      <p>to book an appointment with {appointment.doctor_name} on {dateString}.</p>
    </span>
  )
}

export default AppointmentNotification;