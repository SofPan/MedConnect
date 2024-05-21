import { useContext, useEffect, useState } from 'react'
import { UserSignedIn } from '../../App';
import RenderProfile from './RenderProfile';
import { useGet } from '../../hooks/useAPI';

const UserProfile = () => {

  const {userState, dispatch} = useContext(UserSignedIn);

  const {getData, get} = useGet();

  const [isClinic, setIsClinic] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    get(
      "profile",
      userState.userInfo.user_id ? userState.userInfo.user_id : userState.userInfo.id
    );
  }, [])

  useEffect(() => {
    if (getData){
      dispatch({type: "SET_USER_PROFILE", payload: getData});
      setIsClinic(getData.is_clinic);
      setLoaded(true);
    }
  }, [getData]);

  return(
    <>
      {loaded && <RenderProfile userProfile={userState.userProfile} isClinic={isClinic} />}
    </>
    
  )
}

export default UserProfile;