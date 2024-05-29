import { useState, useEffect, useContext } from "react";
import { useGet } from "../../hooks/useAPI";
import { UserSignedIn } from '../../App';
import { useAppointments } from "../../hooks/useAppointments";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import UnbookedAppointments from "./UnbookedAppointments";
import BoxWithScroll from "../GeneralComponents/BoxWithScroll";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import List from "../List/List";
import AppointmentsListItem from "../List/AppointmentsListItem";

const PatientAppointments = () => {
  const { userState } = useContext(UserSignedIn);
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
            <UnbookedAppointments />
          </BoxWithScroll>
        </AccordionWrapper>                
      </Box>
      {!appointments.length 
        ? 
        <span>You do not have any appointments booked</span>
        :
        <div className="appointments-booked">
          <BoxWithScroll height="50vh">
            <List listItems={appointments} ItemComponent={AppointmentsListItem} />
          </BoxWithScroll>
        </div>
        }
    </>
  )
}

export default PatientAppointments;