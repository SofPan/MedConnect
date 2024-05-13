import { useContext, useEffect, useState } from 'react'
import { UserSignedIn } from '../../App';
import RenderProfile from './RenderProfile';
import { useGet } from '../../hooks/useAPI';

const UserProfile = () => {

  const userContext = useContext(UserSignedIn) ;

  const {loading, data} = useGet(
    "profile",
    userContext.userState.userInfo.user_id ? userContext.userState.userInfo.user_id : userContext.userState.userInfo.id
  );

  const [isClinic, setIsClinic] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (data){
      setIsClinic(data.is_clinic);
      setLoaded(!loading);
    }
  }, [data, loading]);

  return(
    <>
      {loaded && <RenderProfile userProfile={data} isClinic={isClinic} />}
    </>
    
  )
}

export default UserProfile;