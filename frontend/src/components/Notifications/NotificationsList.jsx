import NotificationsListItem from "./NotificationsListItem";

const NotificationsList = (props) => {
  const {notifications} = props;
  const mapNotifications = notifications.map(notification => {
    return <NotificationsListItem />;
  })
  return(
    <ul>
      {mapNotifications}
    </ul>
  )
}

export default NotificationsList;