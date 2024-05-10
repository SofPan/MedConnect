import { useEffect, useState } from "react";
import RegisterNotification from "./RegisterNotification";
import AppointmentNotification from "./AppointmentNotification";
import { fetchOnePatient } from "../../hooks/tempUseAPI";

const NotificationsListItem = (props) => {
  const {
    id,
    patient_id,
    doctor_id,
    type,
    appointment_id
  } = props;

  const [notificationType, setNotificationtype] = useState(null);
  const [patientName, setPatientName] = useState("");
  
  useEffect(() => {
    const getPatientName = async () => {
      const patientData = await fetchOnePatient(patient_id);
      setPatientName(patientData.name);
    }

    getPatientName();

    (type === "register" || type === "change") 
      && setNotificationtype(<RegisterNotification doctor_id={doctor_id} type={type} notification_id={id} />);

    type === "appointment" 
      && setNotificationtype(<AppointmentNotification appointment_id={appointment_id} notification_id={id} />);
  }, [])

  return(
    <li>
      <span>New request from {patientName}: {notificationType}</span>
    </li>
  )
}

export default NotificationsListItem;