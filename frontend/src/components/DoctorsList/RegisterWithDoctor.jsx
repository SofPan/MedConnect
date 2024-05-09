import axios from "axios";
import { useContext, useState } from "react";
import { UserSignedIn } from "../../App";

const RegisterWithDoctor = () => {
  const { userState } = useContext(UserSignedIn);
  const [errorMessage, setErrorMessage] = useState('');

  const userInfo = userState.userInfo;

  const clinicInfo = userState.clinicInfo;
  
  const filteredDoctors = userState.doctors.filter(doctor => {
    // Only show the Clinic's doctors that are accepting patients
    return doctor.clinic_id === clinicInfo.clinic_id && doctor.number_of_patients
  })

  const handleRegister = (doctor_id) => {
    if (userInfo.id && !userInfo.is_clinic) {
      axios.get(`http://localhost:8080/patients/${userInfo.id}`,)
        .then(response => {
         const patient = response.data;
          if (patient.doctor_id) {
            setErrorMessage("You are already registered with a doctor.Do you want to change doctors?");
          } else {
            axios.post(`http://localhost:8080/requests`, {
              request_type: "register",
              patient_id: patient.id,
              clinic_id: clinicInfo.clinic_id,
              doctor_id: doctor_id,
              appointment_id: null
            })
            .then(response => {
              if (response.data.message) {
                setErrorMessage(response.data.message)
              }
            })
          }
        })
        .catch(error => {
          console.error("Error registering with doctor:", error);
          setErrorMessage("An error occurred. Please try again later.");
        });
    } else if (!userInfo.id) {
      setErrorMessage("Please login or sign up to register with a doctor");
    } else {
      setErrorMessage("You cannot register with a doctor. Please, login or sign up as a patient");
    }
  }

  console.log("err msg", errorMessage)

  return (
    <div>
      <h3>{clinicInfo.clinic_name}</h3>
      <p>{clinicInfo.clinic_address}</p>
      {filteredDoctors.map(doctor => {
        return (
          <div key={doctor.id}>
            <p>Accepting {doctor.number_of_patients} more patients</p>
            <p>{doctor.name}</p>
            <p>{doctor.qualifications}</p>
            <img src={`./assets/images/${doctor.photo_url}`} alt={doctor.name}/>
            <button onClick={() => handleRegister(doctor.id)}>Register</button>
            <h2>{errorMessage}</h2>
          </div>
        )
      })}
    </div>
  )
}

export default RegisterWithDoctor;