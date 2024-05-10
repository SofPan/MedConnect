
import {Button} from "@mui/material"
import { useEffect, useState } from "react";

const NotificationActions = (props) => {
  const {notification_id, onAccept} = props;

  const [declining, setDeclining] = useState(false);

  useEffect(() => {
    const declineNotification = async () => {
      console.log("declining...", notification_id);
    }

    declining && declineNotification();
  }, [declining])
  const handleDecline = () => {
    setDeclining(true);
  }
  return(
    <div>
      <Button onClick={onAccept}>Accept</Button>
      <Button onClick={handleDecline}>Decline</Button>
    </div>
  )
}

export default NotificationActions;

