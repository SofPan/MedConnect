import ClinicProfile from "./ClinicProfile";
import { useEffect, useState } from 'react'
import axios from 'axios'

/* 
  Component will make axios call to pull in appropriate user profile
  based on if this is a Patient or a Clinic that is logged in
*/
const UserProfile = (props) => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/profile/4`)
      .then(res => setUserProfile(res.data))
      .catch(error => console.error("user profile error", error));
  }, []);
  
  return(
    <section>
      <ClinicProfile userProfile={userProfile}/>
    </section>
  )
}

export default UserProfile;