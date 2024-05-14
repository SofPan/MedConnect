import { useDelete } from "../../hooks/useAPI";
import {Button} from "@mui/material"
import { useEffect, useState } from "react";

const NotificationActions = (props) => {
  const {notification_id, onAccept} = props;

  const [declining, setDeclining] = useState(false);
  const {deleteLoading, deleteData, deleteRecord} = useDelete();


  useEffect(() => {
    declining && deleteRecord(
      'requests',
      notification_id
    );
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

