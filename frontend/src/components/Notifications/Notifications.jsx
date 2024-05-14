import { useState, useEffect } from "react";
import { useGet } from "../../hooks/useAPI";
import NotificationsList from "./NotificationsList";

const Notifications = (props) => {
  const {userProfile} = props;

  const {getData, get} = useGet();

  const [notifications, setNotifications] = useState([]);
  const [changeNotifications, setChangeNotifications] = useState(0);

  useEffect(() => {
    console.log("get will run", changeNotifications);
    get(
      'requests',
      userProfile.id
    );
    console.log("get did run");
  }, [changeNotifications]);

  useEffect(() => {
    console.log("new data");
    getData && setNotifications(getData);
    console.log("notifications set");
  }, [getData]);

  const handleChange = () => {
    setChangeNotifications(changeNotifications + 1);
  }

  return(
    <div className='profile-notifications'>
      <h2>Notifications</h2>
      {!notifications.length
        ?
        <span>No pending requests.</span>
        :
        <NotificationsList notifications={notifications} handleChange={handleChange}/>
      }
    </div>
  )
}

export default Notifications;