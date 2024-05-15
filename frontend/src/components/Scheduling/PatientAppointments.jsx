import { useState, useEffect, useContext } from "react";
import { useGet } from "../../hooks/useAPI";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import AppointmentsList from "../AppointmentsList/AppointmentsList";
import UnbookedAppointments from "./UnbookedAppointments";
import { UserSignedIn } from '../../App';
import { useAppointments } from "../../hooks/useAppointments";

const PatientAppointments = () => {
  const { userState, dispatch } = useContext(UserSignedIn);
  const [appointments, setAppointments] = useState([]);
  const userProfile = userState.userInfo;

  const {getData, get} = useGet();
  const {appointmentState, appointmentDispatch} = useAppointments();

  useEffect(() => {
    appointments.length !== appointmentState.appointments.length &&
    get(
      'appointments/patients',
      userProfile.id
    )
  }, [appointmentState.appointments]);

  useEffect(() => {
    if(getData){
      appointmentDispatch({type: "SET_APPOINTMENTS", payload: getData});
      setAppointments(getData);
    }
  }, [getData]);

  return(
    <>
      <h2>Appointments</h2>
      <AccordionWrapper title="Request">
        <UnbookedAppointments userProfile={userProfile} appointmentDispatch={appointmentDispatch} appointmentState={appointmentState}/>
      </AccordionWrapper>                
      {!appointments.length 
        ? 
        <span>You do not have any appointments booked</span>
        :
        <div className="appointments-booked">
          <AppointmentsList patient_id={userProfile.id} appointments={appointments} appointmentDispatch={appointmentDispatch}/>
        </div>
        }
    </>
  )
}

export default PatientAppointments;