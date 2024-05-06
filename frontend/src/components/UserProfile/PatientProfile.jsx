import UserInformation from "./UserInformation";

const PatientProfile = (props) => {
  const {userProfile} = props;
  return(
    <div className="patient-profile">
      <UserInformation userProfile={userProfile} />
    </div>
  )
}

export default PatientProfile;