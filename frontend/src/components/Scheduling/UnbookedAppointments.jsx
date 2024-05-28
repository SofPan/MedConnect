
import { useContext, useEffect, useState } from "react";
import { UserSignedIn } from "../../App";
import { useAppointments } from "../../hooks/useAppointments";
import { useGet } from "../../hooks/useAPI";
import List from "../List/List";
import AppointmentsListItem from "../List/AppointmentsListItem";

const UnbookedAppointments = (props) => {
  const {userState} = useContext(UserSignedIn);
  const {appointmentDispatch} = useAppointments();

  
  const {getData, get} = useGet();
  const [unbookedAppointments, setUnbookedAppointments] = useState([]);

  useEffect(() => {
    userState.userInfo.doctor_id &&
    get(
      'appointments/open',
      userState.userInfo.doctor_id
    );

  }, [userState.userProfile]);

  useEffect(() => {
    if(getData){
      appointmentDispatch({type: "SET_OPEN_APPOINTMENTS", payload: getData});
      setUnbookedAppointments(getData);
    }
  }, [getData]);
  
  return(
    <>
      {
        !unbookedAppointments.length 
        ? 
        <span>There are no appointments available to request</span>
        :
        <div className="appointments-open" >
          <List listItems={unbookedAppointments} ItemComponent={AppointmentsListItem}/>
        </div>
      }
    </>
  )
}

export default UnbookedAppointments;