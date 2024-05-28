import { useState, useEffect, useContext } from "react";
import { useGet } from "../../hooks/useAPI";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import UnbookedAppointments from "./UnbookedAppointments";
import { UserSignedIn } from '../../App';
import { useAppointments } from "../../hooks/useAppointments";
import BoxWithScroll from "../GeneralComponents/BoxWithScroll";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import List from "../List/List";
import AppointmentsListItem from "../AppointmentsList/AppointmentsListItem";

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
      <Typography variant="h3">Appointments</Typography>
      <Box className="my-8">
        <AccordionWrapper title="Request">
          <BoxWithScroll height="25vh">
            <UnbookedAppointments userProfile={userProfile} appointmentDispatch={appointmentDispatch} appointmentState={appointmentState} name={userProfile.name}/>
          </BoxWithScroll>
        </AccordionWrapper>                
      </Box>
      {!appointments.length 
        ? 
        <span>You do not have any appointments booked</span>
        :
        <div className="appointments-booked">
          <BoxWithScroll height="50vh">
            {/* <AppointmentsList patient_id={userProfile.id} appointments={appointments} appointmentDispatch={appointmentDispatch} name={userProfile.name}/> */}
            <List listItems={appointments} ItemComponent={AppointmentsListItem} />
          </BoxWithScroll>
        </div>
        }
    </>
  )
}

export default PatientAppointments;