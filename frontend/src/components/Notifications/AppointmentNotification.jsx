import { useEffect, useState } from "react";
import { fetchOneAppointment, deleteRequest, putAppointment } from "../../hooks/tempUseAPI";
import NotificationActions from "./NotificationActions";

const formatDateAndTime = (date) => {
  return date.replace(":00.000Z", "").split("T");
}

const AppointmentNotification = (props) => {
  const {appointment_id, notification_id, patient} = props;

  const [appointment, setAppointment] = useState({});
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    const getAppointmentDetails = async () => {
      const appointmentData = await fetchOneAppointment(appointment_id);
      setAppointment(appointmentData);
    }

    getAppointmentDetails();
  }, [appointment_id])

  const dateString = appointment.start_time ? `${formatDateAndTime(appointment.start_time)[0]} from ${formatDateAndTime(appointment.start_time)[1]} - ${formatDateAndTime(appointment.end_time)[1]}` : "";

  useEffect(() => {
    const updateAppointmentDetails = async () => {
      await putAppointment(appointment);
    }
    
    const clearRequest = async () => {
      await deleteRequest(notification_id);
    }

    if (accepting){
      updateAppointmentDetails();
      clearRequest();
    }
  }, [accepting])

  const handleAccept = () => {
    setAppointment(prev => ({
        ...prev,
        patient_id: patient.id,
        patient_name: patient.name,
        status: true
      }))
    setAccepting(true);
  }
  return(
    <span>
      <p>Book an appointment with {appointment.doctor_name} on {dateString}.</p>
      <NotificationActions notification_id={notification_id} onAccept={handleAccept}/>
    </span>
  )
}

export default AppointmentNotification;