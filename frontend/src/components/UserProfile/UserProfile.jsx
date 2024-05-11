import { useContext, useEffect, useState } from 'react'
import { fetchUser } from '../../hooks/tempUseAPI';
import { UserSignedIn } from '../../App';
import RenderProfile from './RenderProfile';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isClinic, setIsClinic] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [loaded, setLoaded] = useState(false);
  const userContext = useContext(UserSignedIn) ;

  useEffect(() => {
    if (userContext.userState.userInfo.id){
      setUser(userContext.userState.userInfo);
    }
    
  }, [userContext]);
  
  useEffect(() => {
    console.log("user", user);
    const fetchUserProfile = async () => {
      const userData = await fetchUser(user.user_id ? user.user_id : user.id);
      setUserProfile(() => userData);
      setLoaded(true);
    };
    if (user){
      setIsClinic(user.is_clinic);
      fetchUserProfile();
    }

  },[user]);

  return(
    <>
      {loaded && <RenderProfile userProfile={userProfile} isClinic={isClinic} />}
    </>
    
  )
}

export default UserProfile;