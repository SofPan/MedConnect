import { useEffect, useState } from "react";
import { usePost, usePut } from "../../hooks/useAPI";
import {putAppointment } from "../../hooks/tempUseAPI";

import {
    Box,
    Button,
    Card,
  } from '@mui/material';

const formatDateAndTime = (date) => {
  return date.replace(":00.000Z", "").split("T");
}

const AppointmentsListItem = (props) => {
  
  const {
    doctor_name,
    clinic_address,
    clinic_id,
    doctor_id,
    start_time,
    end_time,
    status,
    appointment,
    user_id
  } = props;

  const [editing, setEditing] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(appointment);

  const [requesting, setRequesting] = useState(false);
  const [requestDetails, setRequestDetails] = useState({});

  const {postLoading, postData, post} = usePost();
  const {putLoading, putData, put} = usePut();

  useEffect(() => {
    editing && put(
      'appointments',
      appointmentDetails
    )
  }, [editing]);

  useEffect(() => {
    requesting && post(
      'requests',
      requestDetails
    )
  }, [requesting]);


  const handleClickCancel = () => {
    setAppointmentDetails(prev => ({
      ...prev,
      patient_id: null,
      })
    );
    setEditing(true);
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
    setRequesting(true);
  }
  const dateString = `${formatDateAndTime(start_time)[0]} from ${formatDateAndTime(start_time)[1]} - ${formatDateAndTime(end_time)[1]}`

  return(
    <Box marginBottom={"24px"}>
      <Card className="unbooked-appointments">
        <p>Appointment available on {dateString}</p>
        <Button onClick={handleClickRequest}>Request</Button>
      </Card>
      <Card className="patient-appointments">
        <Box padding={"20px"}>
          <p>{status ? "Approved" : "Pending"}</p>
          <p>You have an appointment {!status && "requested"} on {dateString} with {doctor_name}.</p> 
          <p>Clinic address: {clinic_address}</p>
          <Button onClick={handleClickCancel}>Cancel</Button>
        </Box>
      </Card>
    </Box>
  )
}

export default AppointmentsListItem;