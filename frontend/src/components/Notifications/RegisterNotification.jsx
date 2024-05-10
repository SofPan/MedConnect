import { useEffect, useState } from "react";
import { fetchOneDoctor } from "../../hooks/tempUseAPI";

const RegisterNotification = (props) => {
  const {doctor_id, type} = props;

  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const getDoctorName = async () => {
      const doctorData = await fetchOneDoctor(doctor_id);
      setDoctorName(doctorData.name);
    }

    getDoctorName();
  }, [])
  return(
    <span>
      <p>to {type === "register" ? "register with" : "change to"} {doctorName}</p>
    </span>
  )
}

export default RegisterNotification;