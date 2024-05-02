import ClinicProfile from "./ClinicProfile";

/* 
  Component will make axios call to pull in appropriate user profile
  based on if this is a Patient or a Clinic that is logged in
*/
const UserProfile = (props) => {
  return(
    <section>
      <ClinicProfile />
    </section>
  )
}

export default UserProfile;