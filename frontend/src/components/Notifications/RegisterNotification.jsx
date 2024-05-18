import { useContext, useEffect, useState } from "react";
import { useGet, usePut, useDelete } from "../../hooks/useAPI";
import NotificationActions from "./NotificationActions";
import { UserSignedIn } from "../../App";


const RegisterNotification = (props) => {
  const {doctor_id, type, notification_id, patient} = props;

  const {getData, get} = useGet();

  const {put} = usePut();
  const {deleteRecord} = useDelete();
  const {dispatch} = useContext(UserSignedIn);


  const [doctor, setDoctor] = useState({});
  const [editPatient, setEditPatient] = useState(patient);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    get(
      'doctors/single',
      doctor_id
    );
  }, []);

  useEffect(() => {
    getData && setDoctor(getData);
  }, [getData]);

  useEffect(() => {
    if(accepting){
      put(
        'patients',
        editPatient
      )
      put(
        'doctors',
        doctor
      )
      dispatch({type: "EDIT_DOCTOR", payload: doctor});
      deleteRecord(
        'requests',
        notification_id
      );
      dispatch({type: "DELETE_NOTIFICATION", payload: {id: notification_id}});
    } 
      
  }, [accepting]);

  const handleAccept = () => {
    const decrementPatients = doctor.number_of_patients - 1;
    setDoctor(prev => ({
      ...prev,
      number_of_patients: decrementPatients
    }))
    setEditPatient(prev => ({
      ...prev,
      doctor_id
    }));
    setAccepting(true);
  }
  return(
    <div>
      <p className="my-4">{type === "register" ? "Register with" : "Change doctors to"} {doctor.name}</p>
      <NotificationActions notification_id={notification_id} onAccept={handleAccept} />
    </div>
  )
}

export default RegisterNotification;