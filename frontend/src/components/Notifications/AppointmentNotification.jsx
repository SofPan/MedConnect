import { useEffect, useState } from "react";
import { fetchOneAppointment } from "../../hooks/tempUseAPI";

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

  return(
    <span>
      <p>to book an appointment with {appointment.doctor_name} on DATE from START to END.</p>
    </span>
  )
}

export default AppointmentNotification;