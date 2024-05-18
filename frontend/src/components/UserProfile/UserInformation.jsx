import { useContext, useEffect, useState } from "react";
import { UserSignedIn } from "../../App";
import axios from "axios";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const UserInformation = (props) => {
  const {userProfile} = props;
  const formatBirthDate = (date) => {
    return date.split("T").shift();
  }

  const [requestNotification, setRequestNotification] = useState("");

  const { userState } = useContext(UserSignedIn);

  const doctor = userState.doctors.find(doctor => doctor.id === userProfile.doctor_id)

  useEffect(() => {
    if (!userProfile.is_clinic && !userProfile.doctor_id) {
      axios.get(`http://localhost:8080/requests/request/${userProfile.id}?request_type=register`)
      .then(response => {
        if (response.data) {
          console.log("response data", response.data)
          const requestedDoctor = userState.doctors.find(doctor => doctor.id === response.data.request.doctor_id)
          setRequestNotification(`You've sent a request to register with ${requestedDoctor.name}`)
        }
      })
      .catch(error => {
        console.error("Error fetching request to register with doctor:", error);
    })
    } else if (userProfile.doctor_id) {
      axios.get(`http://localhost:8080/requests/request/${userProfile.id}?request_type=change_doctor`)
      .then(response => {
        if (response.data.message) {
          console.log("change doctors data", response.data)
          const requestedDoctor = userState.doctors.find(doctor => doctor.id === response.data.request.doctor_id)
          setRequestNotification(`You've sent a request to change ${doctor.name} to ${requestedDoctor.name}`)
        }
      })
      .catch(error => {
        console.error("Error fetching request to change doctor:", error);
      })
    }
  }, [])

  return(
    <div className='profile-information'>
      <Typography variant="h3" sx={{marginBottom: "2rem"}}>Information</Typography>
      <Box className="pb-8 border-b-2 border-red-900">
        <p><strong>Name:</strong> {userProfile.name}</p>
        <p>{userProfile.address && <span><strong>Address: </strong>{userProfile.address}</span>}</p>
        <p> 
          {
            userProfile.date_of_birth && 
            <span>
              <strong>Date of Birth:</strong> {formatBirthDate(userProfile.date_of_birth)}
            </span>
          }
        </p>
        <p> 
          {
            userProfile.doctor_id &&
            <span>
              <strong>Your Doctor:</strong> {doctor.name}
            </span> 
          }
          </p>
          <p> 
          {
            !userProfile.is_clinic && !userProfile.doctor_id && 
            <span className="text-red">You are not registered with a doctor</span>
          }
          </p>
          <Box className="mt-4 text-red-700">
            <p> 
            {
              requestNotification && `${requestNotification}`
            }
            </p>
          </Box>
      </Box>
    </div>
  )
}

export default UserInformation;