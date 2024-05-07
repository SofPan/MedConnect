import { useContext, useEffect, useState } from 'react'
import ClinicProfile from "./ClinicProfile";
import PatientProfile from './PatientProfile';
import { fetchUser } from '../../hooks/tempUseAPI';
import { UserSignedIn } from '../../App';

const UserProfile = (props) => {
  const [userProfile, setUserProfile] = useState({});
  const tempIsClinic = false;
  const userContext = useContext(UserSignedIn);
  useEffect(() => {
    // console.log("userContext", userContext.userState)
    const fetchUserProfile = async () => {
      const userData = await fetchUser(tempIsClinic? 21: 1);
      setUserProfile(userData);
    };
    fetchUserProfile();
  },[]);

  return(
    <section>

      {
      tempIsClinic ? 
        <ClinicProfile userProfile={userProfile}/>
        :
        <PatientProfile userProfile={userProfile} />
      }
    </section>
  )
}

export default UserProfile;