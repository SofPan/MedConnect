import { useContext, useEffect, useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { usePost, usePut } from "../../hooks/useAPI";
import {
    Box,
    Button,
  } from '@mui/material';
import { UserSignedIn } from "../../App";
import CardWrapper from "../GeneralComponents/CardWrapper";
import { formatDateAndTime } from "../../helpers/formatDateAndTime";

const AppointmentsListItem = (props) => {
  
  const {
    data
  } = props;

  const {appointmentDispatch} = useAppointments();

  const [cancelling, setCancelling] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(data);

  const [requesting, setRequesting] = useState(false);
  const [requestDetails, setRequestDetails] = useState({});

  const [startTime, setStartTime] = useState({date: "", time:""});
  const [endTime, setEndTime] = useState({date: "", time:""});

  const {post} = usePost();
  const {put} = usePut();

  const {dispatch} = useContext(UserSignedIn);

  useEffect(() => {
    if (data){
      setStartTime(formatDateAndTime(data.start_time_string));
      setEndTime(formatDateAndTime(data.end_time_string));
    }
  }, [data]);

  useEffect(() => {
    if (cancelling){
      put(
        'appointments',
        appointmentDetails
      );
      appointmentDispatch({type: "DELETE_APPOINTMENT", payload: appointmentDetails});
      appointmentDispatch({type: "ADD_OPEN_APPOINTMENT", payload: appointmentDetails});
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
      patient_id: data.user_id,
      clinic_id: data.clinic_id,
      doctor_id: data.doctor_id,
      appointment_id: data.appointment.id
    }
    setRequestDetails(requestObject);

    setAppointmentDetails(prev => ({
      ...prev,
      patient_id: data.user_id,
      patient_name: data.name
    }));

    setRequesting(true);
  }

  return(
    <>
    { data &&
    <Box marginBottom={"24px"}>
      <CardWrapper class="unbooked-appointments">
        <p>Appointment available on <strong>{startTime.date}</strong> from {startTime.time} - {endTime.time}</p>
        <Button variant="small" onClick={handleClickRequest}>Request</Button>
      </CardWrapper>
        <CardWrapper class="patient-appointments">
          <Box padding={"20px"}>
            <p><span className="italic font-bold border-b-2 border-red-900 px-1 pb-1">{!data.status ? "Pending" : "Approved"}</span></p>
            <Box className="mt-6">
              <p className="mb-4">You have an appointment {!data.status && "requested"} on <strong>{startTime.date} </strong> from {startTime.time} - {endTime.time} with {data.doctor_name}.</p> 
              <p className="mb-6"><span className="font-bold">Clinic address:</span> {data.clinic_address}</p>
            </Box>
            <Box className="text-right">
              <Button onClick={handleClickCancel}>Cancel</Button>
            </Box>
          </Box>
        </CardWrapper>
      </Box>
    }
    </>
  )
}

export default AppointmentsListItem;