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

  const [notificationType, setNotificationType] = useState(null);
  const [patient, setPatient] = useState("");
  
  useEffect(() => {
    const getPatient = async () => {
      const patientData = await fetchOnePatient(patient_id);
      console.log("patientData", patientData);
      setPatient(patientData);
    }

    getPatient();

    (type === "register" || type === "change") 
      && setNotificationType(<RegisterNotification doctor_id={doctor_id} type={type} notification_id={id} patient={patient} />);

    type === "appointment" 
      && setNotificationType(<AppointmentNotification appointment_id={appointment_id} notification_id={id} />);
  }, [])

  return(
    <li>
      <span>New request from {patient.name}: {notificationType}</span>
    </li>
  )
}

export default NotificationsListItem;