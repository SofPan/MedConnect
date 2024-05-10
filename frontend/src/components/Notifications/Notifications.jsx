import { useState, useEffect } from "react";

const Notifications = (props) => {
  const {userProfile} = props;

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      setNotifications(["test"])
    }

    if (!notifications.length) {
      fetchNotifications();
    }
    console.log(notifications)
  }, [notifications]);

  return(
    <div className='profile-notifications'>
      <h2>Notifications</h2>
      <ul>
        <li>Patient XYZ has requested an appointment</li>
        <li>Patient ABC wants to change doctors</li>
      </ul>
    </div>
  )
}

export default Notifications;