import { useContext, useEffect, useState } from 'react'
import ClinicProfile from "./ClinicProfile";
import PatientProfile from './PatientProfile';
import { fetchUser } from '../../hooks/tempUseAPI';
import { UserSignedIn } from '../../App';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const userContext = useContext(UserSignedIn) ;
  
  const user = userContext.userState.userInfo;
  const isClinic = user.is_clinic;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = await fetchUser(user.id);
      setUserProfile(userData);
    };
    fetchUserProfile();
  },[userContext]);

  const checkUserLoggedIn = () => {
    if (userContext.userState.userLoggedIn) {
      if (isClinic ) {
        return <ClinicProfile userProfile={userProfile}/>
      } else {
        return <PatientProfile userProfile={userProfile} />
      }
    } else {
      // Replace this with an error component
      return <span>You must be logged in to view this page</span>
    }
  }

  return(
    <section>
      {
        checkUserLoggedIn()
      }
      
    </section>
  )
}

export default UserProfile;