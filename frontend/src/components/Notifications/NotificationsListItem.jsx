import { useEffect, useState } from "react";
import RegisterNotification from "./RegisterNotification";
import AppointmentNotification from "./AppointmentNotification";
import NotificationActions from "./NotificationActions";
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
      && setNotificationtype(<RegisterNotification doctor_id={doctor_id} type={type}/>);

    type === "appointment" 
      && setNotificationtype(<AppointmentNotification appointment_id={appointment_id} />);
  }, [])

  return(
    <li>
      <span>New request from {patientName}: {notificationType}</span>
      <NotificationActions />
    </li>
  )
}

export default NotificationsListItem;