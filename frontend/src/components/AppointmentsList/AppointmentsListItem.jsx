import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Card,
  } from '@mui/material';
import { putAppointment } from "../../hooks/tempUseAPI";

const formatDateAndTime = (date) => {
  return date.replace(":00.000Z", "").split("T");
}

const AppointmentsListItem = (props) => {
  
  const {
    doctor_name,
    clinic_address,
    start_time,
    end_time,
    status,
    appointment,
    user_id
  } = props;

  const [editing, setEditing] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(appointment);

  useEffect(() => {
    // PUT instead of DELETE because the Clinic should retain the appointment slot
    const editAppointment = async () => {
      await putAppointment(appointmentDetails);
    };

    if (editing){
      editAppointment();
    }
  }, [editing]);

  const handleClick = (e) => {
    const editType = e.target.textContent;
    setAppointmentDetails(prev => ({
      ...prev,
      patient_id: editType === "Cancel" ? null : user_id,
      })
    );
    setEditing(true);
  }

  const dateString = `${formatDateAndTime(start_time)[0]} from ${formatDateAndTime(start_time)[1]} - ${formatDateAndTime(end_time)[1]}`

  return(
    <Box marginBottom={"24px"}>
      <Card className="unbooked-appointments">
        <p>Appointment available on {dateString}</p>
        <Button onClick={handleClick}>Request</Button>
      </Card>
      <Card className="patient-appointments">
        <Box padding={"20px"}>
          <p>{status ? "Approved" : "Pending"}</p>
          <p>You have an appointment {!status && "requested"} on {dateString} with {doctor_name}.</p> 
          <p>Clinic address: {clinic_address}</p>
          <Button onClick={handleClick}>Cancel</Button>
        </Box>
      </Card>
    </Box>
  )
}

export default AppointmentsListItem;