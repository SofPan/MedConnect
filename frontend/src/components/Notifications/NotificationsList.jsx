import NotificationsListItem from "./NotificationsListItem";

const NotificationsList = (props) => {
  const {notifications, handleChange} = props;
  const mapNotifications = notifications.map(notification => {
    return <NotificationsListItem 
            key={notification.id}
            id={notification.id}
            patient_id={notification.patient_id}
            doctor_id={notification.doctor_id}
            type={notification.request_type}
            appointment_id={notification.appointment_id}
            handleChange={handleChange}
      />;
  })
  return(
    <ul className="p-0 w-72">
      {mapNotifications}
    </ul>
  )
}

export default NotificationsList;