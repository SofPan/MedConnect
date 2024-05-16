import { useContext, useEffect, useState } from "react";
import { usePost, usePut } from "../../hooks/useAPI";

import {
    Box,
    Button,
    Card,
  } from '@mui/material';
import { UserSignedIn } from "../../App";
import CardWrapper from "../GeneralComponents/CardWrapper";

const AppointmentsListItem = (props) => {
  
  const {
    doctor_name,
    clinic_address,
    clinic_id,
    doctor_id,
    startTime,
    endTime,
    status,
    appointment,
    user_id,
    appointmentDispatch,
    name
  } = props;

  const [cancelling, setCancelling] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(appointment);

  const [requesting, setRequesting] = useState(false);
  const [requestDetails, setRequestDetails] = useState({});

  const {post} = usePost();
  const {put} = usePut();

  const {dispatch} = useContext(UserSignedIn);

  useEffect(() => {
    if (cancelling){
      put(
        'appointments',
        appointmentDetails
      );
      appointmentDispatch({type: "DELETE_APPOINTMENT", payload: appointmentDetails});
    }
  }, [cancelling]);

  useEffect(() => {
    if(requesting){
      post(
        'requests',
        requestDetails
      );
      put(
        'appointments',
        appointmentDetails
      )
      dispatch({type: "ADD_NOTIFICATION", payload: requestDetails});
      appointmentDispatch({type: "DELETE_OPEN_APPOINTMENT", payload: appointmentDetails});
      appointmentDispatch({type:"ADD_APPOINTMENT", payload: appointmentDetails});
    }
  }, [requesting]);


  const handleClickCancel = () => {
    setAppointmentDetails(prev => ({
      ...prev,
      patient_id: null,
      })
    );
    setCancelling(true);
  }

  const handleClickRequest = (e) => {
    const requestObject = {
      request_type: "appointment",
      patient_id: user_id,
      clinic_id,
      doctor_id,
      appointment_id: appointment.id
    }
    setRequestDetails(requestObject);

    setAppointmentDetails(prev => ({
      ...prev,
      patient_id: user_id,
      patient_name: name
    }));

    setRequesting(true);
  }

  return(
    <Box marginBottom={"24px"}>
      <CardWrapper class="unbooked-appointments">
        <p>Appointment available on {startTime.date} from {startTime.time} - {endTime.time}</p>
        <Button onClick={handleClickRequest}>Request</Button>
      </CardWrapper>
      <CardWrapper class="patient-appointments">
        <Box padding={"20px"}>
          <p>{status ? "Approved" : "Pending"}</p>
          <p>You have an appointment {!status && "requested"} on {startTime.date} from {startTime.time} - {endTime.time} with {doctor_name}.</p> 
          <p>Clinic address: {clinic_address}</p>
          <Button onClick={handleClickCancel}>Cancel</Button>
        </Box>
      </CardWrapper>
    </Box>
  )
}

export default AppointmentsListItem;