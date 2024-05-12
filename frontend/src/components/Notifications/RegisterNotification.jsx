import { useEffect, useState } from "react";
import { useGet, usePut, useDelete } from "../../hooks/useAPI";
import NotificationActions from "./NotificationActions";


const RegisterNotification = (props) => {
  const {doctor_id, type, notification_id, patient} = props;

  const {loading, data} = useGet(
    'doctors/single',
    doctor_id
  );

  const {putLoading, putData, put} = usePut();
  const {deleteLoading, deleteData, deleteRecord} = useDelete();

  const [doctorName, setDoctorName] = useState("");
  const [editPatient, setEditPatient] = useState(patient);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    data && setDoctorName(data.name);
  }, [data])

  useEffect(() => {
    if(accepting){
      put(
        'patients',
        editPatient
      )
      deleteRecord(
        'notifications',
        notification_id
      );
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