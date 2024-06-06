import { useDelete } from "../../hooks/useAPI";
import { useContext, useEffect, useState } from "react";
import UserSignedIn from '../GeneralComponents/UserSignedIn';
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
    <div className="flex pl-0 mt-4">
      <Button variant="small" onClick={onAccept}>Accept</Button>
      <Button variant="small" onClick={handleDecline}>Decline</Button>
    </div>
  )
}

export default NotificationActions;

