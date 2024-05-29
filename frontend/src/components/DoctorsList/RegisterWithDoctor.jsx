import axios from "axios";
import { useContext, useState } from "react";
import { UserSignedIn } from "../../App";
import { Button, Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import BasicModal from "../GeneralComponents/BasicModal";
import ChangeDoctorModal from "../GeneralComponents/ChangeDoctorModal";
import BoxWithScroll from "../GeneralComponents/BoxWithScroll";

const RegisterWithDoctor = () => {
  const { userState, dispatch } = useContext(UserSignedIn);
  const [errorMessage, setErrorMessage] = useState('');
  const [changeDoctor, setChangeDoctor] = useState(false);
  const [doctorId, setDoctorId] = useState();
  const [requestSent, setRequestSent] = useState(false);
  const [modalTitle, setModalTitle] = useState("")

  const userInfo = userState.userInfo;

  const clinicInfo = userState.clinicInfo;
  
  const filteredDoctors = userState.doctors.filter(doctor => {
    // Only show the Clinic's doctors that are accepting patients
    return doctor.clinic_id === clinicInfo.clinic_id && doctor.number_of_patients
  })

  const handleRegister = (doctor_id) => {
    setDoctorId(doctor_id);
    axios.get(`http://localhost:8080/patients/${userInfo.user_id}`)
      .then(response => {
        const patient = response.data;
        if (patient.doctor_id) {
          axios.get(`http://localhost:8080/requests/request/${patient.id}?request_type=change_doctor`)
          .then(response => {
            if (response.data) {
              setModalTitle("Error")
              setErrorMessage("You are already registered with a doctor. A request to change your doctor has already been sent. Please await approval or declination from the clinic.")
              dispatch({ type: "SET_MODAL", payload: true})
            } else {
              setChangeDoctor(true);
              setModalTitle("YOU ARE REGISTERED WITH A DOCTOR")
              setErrorMessage("CHANGING FAMILY DOCTORS MAY INCURR FILE TRANSFER FEES AS SET BY THE CLINIC. ARE YOU SURE YOU WANT TO REQUEST TO CHANGE FAMILY DOCTORS?");
              dispatch({ type: "SET_MODAL", payload: true})
            }
          })
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
              setModalTitle("Error")
              setErrorMessage(`${response.data.message}. Please await approval or declination from the clinic.`)
              dispatch({ type: "SET_MODAL", payload: true})
            } else {
              setRequestSent(true);
              setModalTitle("Thank you!")
              setErrorMessage("Your request to register with the doctor was sent successfully.")
              dispatch({ type: "SET_MODAL", payload: true})
            }
          })
        }
      })
      .catch(error => {
        console.error("Error registering with doctor:", error);
        setModalTitle("Error")
        setErrorMessage("An error occurred. Please try again later.");
        dispatch({ type: "SET_MODAL", payload: true})
      });
  }

  const handleCancel = () => {
    setChangeDoctor(false);
    setErrorMessage('');
    setModalTitle('');
    dispatch({ type: "SET_MODAL", payload: false})
  }

  const handleChangeDoctorRequest = (doctorId) => {
    axios.get(`http://localhost:8080/patients/${userInfo.user_id}`)
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
            setModalTitle("Error")
            dispatch({ type: "SET_MODAL", payload: true})
          } else {
          setModalTitle("Thank you!")
          setErrorMessage("The request to change your doctor was sent");
          dispatch({ type: "SET_MODAL", payload: true})
          setChangeDoctor(false);
          }
        })
      })
      .catch(error => {
        console.error("Error requesting to change doctor:", error);
        setErrorMessage("An error occurred. Please try again later.");
        setModalTitle("Error")
      });
  }
  

  return (
    <Box className="py-10 px-20">
      {changeDoctor ? 
        <ChangeDoctorModal title={modalTitle} message={errorMessage} handleCancel={handleCancel} handleChangeDoctorRequest={handleChangeDoctorRequest} doctorId={doctorId}/> 
        : 
        <BasicModal title={modalTitle} message={errorMessage}/>
      }
      <Box className="my-8 border-b-2 border-red-900">
        <Typography variant="h3" sx={{ marginBottom: 1, marginTop: 3 }}>{clinicInfo.clinic_name}</Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}> {clinicInfo.clinic_address}</Typography>
      </Box>
      <Box className="flex flex-wrap justify-between">
        {filteredDoctors.map(doctor => (
          <Box  key={doctor.id} width="calc((100% / 3) - 24px)">
            <Card sx={{ display: 'flex', marginBottom: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: "40%", marginRight: "12px", borderRight: "0.5px solid #ddd" }}
                image={`./assets/images/${doctor.photo_url}`}
                alt={doctor.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Typography variant="h5">{doctor.name}</Typography>
                  <Typography variant="body2" color="text.secondary"><span className="border-b-2 border-red-900 pb-1">{doctor.qualifications}</span></Typography>
                  <p className="my-4 mx-1"><small>Accepting {doctor.number_of_patients} more patients</small></p>
                  <Box >
                    <Button 
                      variant="small" 
                      color="primary" 
                      disabled={requestSent} 
                      onClick={() => handleRegister(doctor.id)}
                    >
                      Register
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RegisterWithDoctor;