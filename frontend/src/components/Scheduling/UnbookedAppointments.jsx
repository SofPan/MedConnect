
import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useAPI";
import AppointmentsList from "../AppointmentsList/AppointmentsList";

const UnbookedAppointments = (props) => {
    const {userProfile, appointmentDispatch, appointmentState} = props;
    
  const {getData, get} = useGet();
  const [unbookedAppointments, setUnbookedAppointments] = useState([]);

  useEffect(() => {
    unbookedAppointments.length !== appointmentState.open_appointments.length &&
    get(
      'appointments/open',
      userProfile.doctor_id
    )
  }, [appointmentState.open_appointments]);

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