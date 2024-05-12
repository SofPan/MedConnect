import { useEffect, useState } from "react";
import { fetchOneDoctor, putPatient, deleteRequest } from "../../hooks/tempUseAPI";
import NotificationActions from "./NotificationActions";
import { useGet, usePut } from "../../hooks/useAPI";


const RegisterNotification = (props) => {
  const {doctor_id, type, notification_id, patient} = props;

  const {loading, data} = useGet(
    'doctors/single',
    doctor_id
  );

  const {putLoading, putData, put} = usePut();


  const [doctorName, setDoctorName] = useState("");
  const [editPatient, setEditPatient] = useState(patient);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    data && setDoctorName(data.name);
  }, [data])

  useEffect(() => {
    const clearRequest = async () => {
      await deleteRequest(notification_id);
    }
    
    if(accepting){
      put(
        'patients',
        editPatient
      )
      clearRequest();
    } 
      
  }, [accepting]);

  const handleAccept = () => {
    setEditPatient(prev => ({
      ...prev,
      doctor_id
    }));
    setAccepting(true);
  }
  return(
    <span>
      <p>{type === "register" ? "Register with" : "Change doctors to"} {doctorName}</p>
      <NotificationActions notification_id={notification_id} onAccept={handleAccept} />
    </span>
  )
}

export default RegisterNotification;