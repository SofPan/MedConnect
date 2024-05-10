import { useEffect, useState } from "react";
import { fetchOneDoctor } from "../../hooks/tempUseAPI";

const RegisterNotification = (props) => {
  const {doctor_id} = props;

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
      <p>to register with {doctorName}</p>
    </span>
  )
}

export default RegisterNotification;