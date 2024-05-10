import { useState, useEffect } from "react";
import { fetchRequestNotifications } from "../../hooks/tempUseAPI";
import NotificationsList from "./NotificationsList";

const Notifications = (props) => {
  const {userProfile} = props;

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notificationsData = await fetchRequestNotifications(userProfile.id);
      setNotifications(notificationsData);
    }

    if (!notifications.length) {
      fetchNotifications();
    }
  }, [userProfile]);

  return(
    <div className='profile-notifications'>
      <h2>Notifications</h2>
      <NotificationsList notifications={notifications}/>
    </div>
  )
}

export default Notifications;