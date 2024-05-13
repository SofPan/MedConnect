import { useContext, useEffect, useState } from 'react'
import { UserSignedIn } from '../../App';
import RenderProfile from './RenderProfile';
import { useGet } from '../../hooks/useAPI';

const UserProfile = () => {

  const userContext = useContext(UserSignedIn);

  const {getLoading, getData, get} = useGet();

  const [isClinic, setIsClinic] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    get(
      "profile",
      userContext.userState.userInfo.user_id ? userContext.userState.userInfo.user_id : userContext.userState.userInfo.id
    );
    if (getData){
      setIsClinic(getData.is_clinic);
      setLoaded(true);
    }
  }, [getData, getLoading]);

  return(
    <>
      {loaded && <RenderProfile userProfile={getData} isClinic={isClinic} />}
    </>
    
  )
}

export default UserProfile;