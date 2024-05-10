import { useEffect, useState } from "react";

const RegisterNotification = (props) => {
  const {doctor_id} = props;

  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const getDoctorName = async () => {
      console.log("fetching doctor", doctor_id);
    }

    getDoctorName();
  }, [])
  return(
    <span>
      <p>to register with ${doctor_id}</p>
    </span>
  )
}

export default RegisterNotification;