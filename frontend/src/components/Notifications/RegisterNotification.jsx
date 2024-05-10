import { useEffect, useState } from "react";
import { fetchOneDoctor } from "../../hooks/tempUseAPI";
import NotificationActions from "./NotificationActions";


const RegisterNotification = (props) => {
  const {doctor_id, type, notification_id} = props;

  const [doctorName, setDoctorName] = useState("");
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    const getDoctorName = async () => {
      const doctorData = await fetchOneDoctor(doctor_id);
      setDoctorName(doctorData.name);
    }

    getDoctorName();
  }, [])

  useEffect(() => {
    const updatePatientRecord = async () => {
      console.log("updating patient record")
    }
    
    accepting && updatePatientRecord();
  }, [accepting]);

  const handleAccept = () => {
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