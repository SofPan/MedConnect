import { useEffect, useState } from 'react'
import ClinicProfile from "./ClinicProfile";
import { fetchUser } from '../../hooks/tempUseAPI';

const UserProfile = (props) => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = await fetchUser(4);
      setUserProfile(userData);
    };
    fetchUserProfile();
  },[]);

  return(
    <section>
      <ClinicProfile userProfile={userProfile}/>
    </section>
  )
}

export default UserProfile;