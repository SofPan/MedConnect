import { useState, useEffect, useContext } from "react";
import { useGet } from "../../hooks/useAPI";
import { UserSignedIn } from "../../App";
import NotificationsList from "./NotificationsList";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import List from "../List/List";
import NotificationsListItem from "./NotificationsListItem";

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
    <Box className='profile-notifications mt-24'>
      <Typography variant="h3" sx={{marginBottom: "2rem"}}>Notifications</Typography>
      {!notifications.length
        ?
        <span>No pending requests.</span>
        :
        <List listItems={notifications} ItemComponent={NotificationsListItem} />
        // <NotificationsList notifications={notifications}/>
      }
    </Box>
  )
}

export default Notifications;