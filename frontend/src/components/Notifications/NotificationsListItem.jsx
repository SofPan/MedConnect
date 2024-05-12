import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useAPI";
import RegisterNotification from "./RegisterNotification";
import AppointmentNotification from "./AppointmentNotification";

const NotificationsListItem = (props) => {
  const {
    id,
    patient_id,
    doctor_id,
    type,
    appointment_id
  } = props;

  const {loading, data} = useGet(
    'patients',
    patient_id
  )

  const [notificationType, setNotificationType] = useState(null);
  const [patient, setPatient] = useState("");
  
  useEffect(() => {
    data && setPatient(data);
  }, [data])

  useEffect(() => {
    if (patient.name){
      (type === "register" || type === "change_doctor") 
      && setNotificationType(<RegisterNotification doctor_id={doctor_id} type={type} notification_id={id} patient={patient} />);

      type === "appointment" 
        && setNotificationType(<AppointmentNotification appointment_id={appointment_id} notification_id={id} patient={patient}/>);
    }

  }, [patient])

  return(
    <li>
      <span>New request from {patient.name}: {notificationType}</span>
    </li>
  )
}

export default NotificationsListItem;