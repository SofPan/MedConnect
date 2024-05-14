import { useDelete } from "../../hooks/useAPI";
import { useContext, useEffect, useState } from "react";
import { UserSignedIn } from "../../App";
import {Button} from "@mui/material"

const NotificationActions = (props) => {
  const {notification_id, onAccept} = props;

  const [declining, setDeclining] = useState(false);
  const {deleteRecord} = useDelete();
  const {dispatch} = useContext(UserSignedIn);



  useEffect(() => {
    if(declining){
      deleteRecord(
        'requests',
        notification_id
      );
      dispatch({type: "DELETE_NOTIFICATION", payload: {id: notification_id}});
    }
  }, [declining]);

  const handleDecline = () => {
    setDeclining(true);
  };

  return(
    <div>
      <Button onClick={onAccept}>Accept</Button>
      <Button onClick={handleDecline}>Decline</Button>
    </div>
  )
}

export default NotificationActions;

