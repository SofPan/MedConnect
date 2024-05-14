import { useState, useEffect, useContext } from "react";
import { useGet } from "../../hooks/useAPI";
import { UserSignedIn } from "../../App";
import NotificationsList from "./NotificationsList";

const Notifications = (props) => {
  const {userProfile} = props;

  const {getData, get} = useGet();
  
  const {userState, dispatch} = useContext(UserSignedIn);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    notifications.length !== userState.notifications.length &&
    get(
      'requests',
      userProfile.id
    );
  }, [userState.notifications]);

  useEffect(() => {
    if(getData) {
      dispatch({type: "SET_NOTIFICATIONS", payload: getData});
      setNotifications(getData);
    } 
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