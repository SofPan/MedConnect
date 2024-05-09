import { useContext, useEffect, useState } from 'react'
import { fetchUser } from '../../hooks/tempUseAPI';
import { UserSignedIn } from '../../App';
import RenderProfile from './RenderProfile';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const userContext = useContext(UserSignedIn) ;
  
  const user = userContext.userState.userInfo;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = await fetchUser(user.id);
      setUserProfile(userData);
    };
    fetchUserProfile();
  },[userContext]);

  const checkUserLoggedIn = () => {
    if (userContext.userState.userLoggedIn) {
      return <RenderProfile userProfile={userProfile}/>
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