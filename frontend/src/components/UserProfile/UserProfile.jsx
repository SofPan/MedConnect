import { useContext, useEffect, useState } from 'react'
import ClinicProfile from "./ClinicProfile";
import { fetchUser } from '../../hooks/tempUseAPI';
import { UserSignedIn } from '../../App';

const UserProfile = (props) => {
  const [userProfile, setUserProfile] = useState({});

  const userContext = useContext(UserSignedIn);
  useEffect(() => {
    // console.log("userContext", userContext.userState)
    const fetchUserProfile = async () => {
      const userData = await fetchUser(21);
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