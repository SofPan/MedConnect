
import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useAPI";
import AppointmentsList from "../AppointmentsList/AppointmentsList";

const UnbookedAppointments = (props) => {
    const {userProfile} = props;
    
  const {getData, get} = useGet();
  const [unbookedAppointments, setUnbookedAppointments] = useState([]);

  useEffect(() => {
    get(
      'appointments/open',
      userProfile.doctor_id
    )
  }, []);

  useEffect(() => {
    getData && setUnbookedAppointments(getData);
  }, [getData]);
  
  return(
    <>
      {
        !unbookedAppointments.length 
        ? 
        <span>There are no appointments available to request</span>
        :
        <div className="appointments-open" >
          <AppointmentsList patient_id={null} appointments={unbookedAppointments} user_id={userProfile.id} />
        </div>
      }
    </>
  )
}

export default UnbookedAppointments;