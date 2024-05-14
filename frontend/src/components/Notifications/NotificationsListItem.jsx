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

  const {getData, get} = useGet();

  const [notificationType, setNotificationType] = useState(null);
  const [patient, setPatient] = useState("");
  
  useEffect(() => {
    get(
      'patients',
      patient_id
    );
  }, []);
  useEffect(() => {
    getData && setPatient(getData);
  }, [getData])

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