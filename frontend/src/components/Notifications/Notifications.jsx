import { useState, useEffect } from "react";
import { useGet } from "../../hooks/useAPI";
import NotificationsList from "./NotificationsList";

const Notifications = (props) => {
  const {userProfile} = props;

  const {getData, get} = useGet();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    get(
      'requests',
      userProfile.id
    );
    getData && setNotifications(getData);
  }, [getData]);

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