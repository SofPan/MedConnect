import axios from "axios";
import { useContext, useState } from "react";
import { UserSignedIn } from "../../App";

const RegisterWithDoctor = () => {
  const { userState } = useContext(UserSignedIn);
  const [errorMessage, setErrorMessage] = useState('');

  const userInfo = userState.userInfo;

  console.log(userInfo)

  const clinicInfo = userState.clinicInfo;
  
  const filteredDoctors = userState.doctors.filter(doctor => {
    // Only show the Clinic's doctors that are accepting patients
    return doctor.clinic_id === clinicInfo.clinic_id && doctor.number_of_patients
  })

  const handleRegister = (doctor_id) => {
    if (userInfo.id && !userInfo.is_clinic) {
      axios.put(`http://localhost:8080/patients/${userInfo.id}`, { doctor_id: doctor_id })
        .then(response => {
          
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            setErrorMessage("You are already registered with a doctor.");
          } else {
            console.error("Error registering with doctor:", error);
            setErrorMessage("An error occurred. Please try again later.");
          }
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
          </div>
        )
      })}
    </div>
  )
}

export default RegisterWithDoctor;