import UserInformation from "./UserInformation";

const PatientProfile = (props) => {
  const {userProfile} = props;
  console.log(userProfile);
  return(
    <div className="patient-profile">
      <UserInformation userProfile={userProfile} />
    </div>
  )
}

export default PatientProfile;