import { useContext } from "react";
import { UserSignedIn } from "../../App";

const UserInformation = (props) => {
  const {userProfile} = props;
  const formatBirthDate = (date) => {
    return date.split("T").shift();
  }

  const { userState } = useContext(UserSignedIn);

  const doctor = userState.doctors.find(doctor => doctor.id === userProfile.doctor_id)

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
            `Doctor: ${doctor.name}`
          }
          </p>
          <p> 
          {
            !userProfile.is_clinic && !userProfile.doctor_id && 
            `You are not registered with a doctor`
          }
          </p>
      </div>
      {/* <Button>Edit</Button> */}
    </div>
  )
}

export default UserInformation;