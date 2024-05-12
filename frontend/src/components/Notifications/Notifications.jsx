import { useState, useEffect } from "react";
import { fetchRequestNotifications } from "../../hooks/tempUseAPI";
import NotificationsList from "./NotificationsList";
import { useGet } from "../../hooks/useAPI";

const Notifications = (props) => {
  const {userProfile} = props;

  const {loading, data} = useGet(
    'requests',
    userProfile.id
  );

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    data && setNotifications(data)
  }, [data]);

  return(
    <div className='profile-notifications'>
      <h2>Notifications</h2>
      {!notifications.length
        ?
        <span>No pending requests.</span>
        :
        <NotificationsList notifications={notifications}/>
      }
    </div>
  )
}

export default Notifications;