import NotificationsListItem from "./NotificationsListItem";

const NotificationsList = (props) => {
  const {notifications} = props;
  const mapNotifications = notifications.map(notification => {
    return <NotificationsListItem 
            key={notification.id}
            id={notification.id}
            patient_id={notification.patient_id}
            doctor_id={notification.doctor_id}
            type={notification.request_type}
            appointment_id={notification.appointment_id}
      />;
  })
  return(
    <ul>
      {mapNotifications}
    </ul>
  )
}

export default NotificationsList;