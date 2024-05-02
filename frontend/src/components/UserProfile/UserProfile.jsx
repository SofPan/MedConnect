import { useEffect, useState } from 'react'
import axios from 'axios'
import ClinicProfile from "./ClinicProfile";

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