import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useAPI";
import RegisterNotification from "./RegisterNotification";
import AppointmentNotification from "./AppointmentNotification";

const NotificationsListItem = (props) => {
  const {
    data
  } = props;

  const {getData, get} = useGet();

  const [notificationType, setNotificationType] = useState(null);
  const [patient, setPatient] = useState("");
  
  useEffect(() => {
    console.log("data", data);
    get(
      'patients/patient',
      data.patient_id
    );
  }, []);

  useEffect(() => {
    getData && setPatient(getData);
  }, [getData])

  useEffect(() => {
    if (patient.name){
      (data.request_type === "register" || data.request_type === "change_doctor") 
      && setNotificationType(<RegisterNotification doctor_id={data.doctor_id} request_type={data.request_type} notification_id={data.id} patient={patient} handleChange={data.handleChange} />);

      data.request_type === "appointment" 
        && setNotificationType(<AppointmentNotification appointment_id={data.appointment_id} notification_id={data.id} patient={patient} handleChange={data.handleChange} />);
    }

  }, [patient])

  return(
    <li className="mb-8 border-b-2 border-red-900 pb-6">
      <span>New request from {patient.name}: {notificationType}</span>
    </li>
  )
}

export default NotificationsListItem;