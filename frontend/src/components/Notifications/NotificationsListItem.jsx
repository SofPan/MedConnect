import { useEffect, useState } from "react";
import RegisterNotification from "./RegisterNotification";
import AppointmentNotification from "./AppointmentNotification";
import NotificationActions from "./NotificationActions";

const NotificationsListItem = (props) => {
  const {
    id,
    patient_id,
    doctor_id,
    type,
    appointment_id
  } = props;

  const [notificationType, setNotificationtype] = useState(null);
  
  useEffect(() => {
    (type === "register" || type === "change") 
      && setNotificationtype(<RegisterNotification doctor_id={doctor_id}/>);

    type === "appointment" 
      && setNotificationtype(<AppointmentNotification />);
  }, [])

  return(
    <li>
      <span>{patient_id} is requesting {notificationType}</span>
      <NotificationActions />
    </li>
  )
}

export default NotificationsListItem;