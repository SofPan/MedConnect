
import { useContext, useEffect, useState } from "react";
import { useGet } from "../../hooks/useAPI";
import AppointmentsList from "../AppointmentsList/AppointmentsList";
import { UserSignedIn } from "../../App";

const UnbookedAppointments = (props) => {
  const {userProfile, appointmentDispatch, appointmentState} = props;

  const {userState} = useContext(UserSignedIn);
  
  const {getData, get} = useGet();
  const [unbookedAppointments, setUnbookedAppointments] = useState([]);

  useEffect(() => {
    userProfile.doctor_id &&
    get(
      'appointments/open',
      userProfile.doctor_id
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
          <AppointmentsList patient_id={null} appointments={unbookedAppointments} user_id={userProfile.id} appointmentDispatch={appointmentDispatch} name={userProfile.name}/>
        </div>
      }
    </>
  )
}

export default UnbookedAppointments;