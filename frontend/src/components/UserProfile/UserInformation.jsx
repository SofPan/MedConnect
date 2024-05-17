import { useContext, useEffect, useState } from "react";
import { UserSignedIn } from "../../App";
import axios from "axios";

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
      <h2>Information</h2>
      <div>
        <p>Name: {userProfile.name}</p>
        <p>{userProfile.address && `Address: ${userProfile.address}`}</p>
        <p> 
          {
            userProfile.date_of_birth && 
            `Date of Birth: ${formatBirthDate(userProfile.date_of_birth)}`
          }
        </p>
        <p> 
          {
            userProfile.doctor_id && 
            `Your Doctor: ${doctor.name}`
          }
          </p>
          <p> 
          {
            !userProfile.is_clinic && !userProfile.doctor_id && 
            `You are not registered with a doctor`
          }
          </p>
          <p> 
          {
            requestNotification && `${requestNotification}`
          }
          </p>
      </div>
      {/* <Button>Edit</Button> */}
    </div>
  )
}

export default UserInformation;