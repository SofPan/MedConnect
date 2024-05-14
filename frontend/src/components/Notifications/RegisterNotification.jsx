import { useEffect, useState } from "react";
import { useGet, usePut, useDelete } from "../../hooks/useAPI";
import NotificationActions from "./NotificationActions";


const RegisterNotification = (props) => {
  const {doctor_id, type, notification_id, patient} = props;

  const {getData, get} = useGet();

  const {putLoading, putData, put} = usePut();
  const {deleteLoading, deleteData, deleteRecord} = useDelete();

  const [doctorName, setDoctorName] = useState("");
  const [editPatient, setEditPatient] = useState(patient);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    get(
      'doctors/single',
      doctor_id
    );
  }, []);

  useEffect(() => {
    getData && setDoctorName(getData.name);
  }, [getData]);

  useEffect(() => {
    if(accepting){
      put(
        'patients',
        editPatient
      )
      deleteRecord(
        'requests',
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