import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Card,
  } from '@mui/material';
import { putAppointment } from "../../hooks/tempUseAPI";

const AppointmentsListItem = (props) => {
  
  const {
    doctor_name,
    details,
    clinic_address,
    status,
    appointment,
    user_id
  } = props;

  const [editing, setEditing] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(appointment);

  const splitDate = details.replace(":00.000Z", "").split("T");
  const formattedDate = `${splitDate[0]} at ${splitDate[1]}`

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

  return(
    <Box marginBottom={"24px"}>
      <Card className="unbooked-appointments">
        <p>Appointment available on {formattedDate}</p>
        <Button onClick={handleClick}>Request</Button>
      </Card>
      <Card className="patient-appointments">
        <Box padding={"20px"}>
          <p>{status ? "Approved" : "Pending"}</p>
          <p>You have an appointment {!status && "requested"} on {formattedDate} with {doctor_name}.</p> 
          <p>Clinic address: {clinic_address}</p>
          <Button onClick={handleClick}>Cancel</Button>
        </Box>
      </Card>
    </Box>
  )
}

export default AppointmentsListItem;