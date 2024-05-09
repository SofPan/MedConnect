import { useContext, useEffect, useState } from 'react'
import { fetchUser } from '../../hooks/tempUseAPI';
import { UserSignedIn } from '../../App';
import RenderProfile from './RenderProfile';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [loaded, setLoaded] = useState(false);
  const userContext = useContext(UserSignedIn) ;
  
  const user = userContext.userState.userInfo;
  const isClinic = user.is_clinic;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = await fetchUser(user.user_id ? user.user_id : user.id);
      setUserProfile(() => userData);
      setLoaded(true);
    };
    if (!loaded){
      fetchUserProfile();
    }

  },[userContext]);

  return(
    <>
      {loaded && <RenderProfile userProfile={userProfile} isClinic={isClinic} />}
    </>
    
  )
}

export default UserProfile;