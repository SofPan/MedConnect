import axios from "axios";
import { useContext, useState } from "react";
import { UserSignedIn } from "../../App";
import { Button } from "@mui/material";
import ChangeDoctor from "./ChangeDoctor";

const RegisterWithDoctor = () => {
  const { userState } = useContext(UserSignedIn);
  const [errorMessage, setErrorMessage] = useState('');
  const [changeDoctor, setChangeDoctor] = useState(false);
  const [doctorId, setDoctorId] = useState();

  const userInfo = userState.userInfo;

  const clinicInfo = userState.clinicInfo;
  
  const filteredDoctors = userState.doctors.filter(doctor => {
    // Only show the Clinic's doctors that are accepting patients
    return doctor.clinic_id === clinicInfo.clinic_id && doctor.number_of_patients
  })

  const handleRegister = (doctor_id) => {
    setDoctorId(doctor_id);
    if (userInfo.id && !userInfo.is_clinic) {
      axios.get(`http://localhost:8080/patients/${userInfo.id}`)
        .then(response => {
         const patient = response.data;
          if (patient.doctor_id) {
            setChangeDoctor(true);
            setErrorMessage("YOU ARE REGISTERED WITH A DOCTOR. CHANGING FAMILY DOCTORS MAY INCURR FILE TRANSFER FEES AS SET BY THE CLINIC. ARE YOU SURE YOU WANT TO REQUEST TO CHANGE FAMILY DOCTORS??");
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

  const handleCancel = () => {
    setChangeDoctor(false);
    setErrorMessage('')
  }

  const handleChangeDoctorRequest = (doctorId) => {
    axios.get(`http://localhost:8080/patients/${userInfo.id}`)
      .then(response => {
        const patient = response.data;
        axios.post(`http://localhost:8080/requests`, {
          request_type: "change_doctor",
          patient_id: patient.id,
          clinic_id: clinicInfo.clinic_id,
          doctor_id: doctorId,
          appointment_id: null
        })
        .then((response) => {
          if (response.data.message) {
            setErrorMessage(response.data.message)
          } else {
          setErrorMessage("The request to change your doctor was sent");
          setChangeDoctor(false);
          }
        })
      })
      .catch(error => {
        console.error("Error requesting to change doctor:", error);
        setErrorMessage("An error occurred. Please try again later.");
      });
  }
  

  return (
    <div>
      <h3>{clinicInfo.clinic_name}</h3>
      <p>{clinicInfo.clinic_address}</p>
      <h2>{errorMessage}</h2>
      {changeDoctor && <ChangeDoctor handleCancel={handleCancel} handleChangeDoctorRequest={handleChangeDoctorRequest} doctor_id={doctorId}/>}
      {filteredDoctors.map(doctor => {
        return (
          <div key={doctor.id}>
            <p>Accepting {doctor.number_of_patients} more patients</p>
            <p>{doctor.name}</p>
            <p>{doctor.qualifications}</p>
            <img src={`./assets/images/${doctor.photo_url}`} alt={doctor.name}/>
            <Button onClick={() => handleRegister(doctor.id)}>Register</Button>
          </div>
        )
      })}
    </div>
  )
}

export default RegisterWithDoctor;