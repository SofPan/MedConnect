import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Card,
  } from '@mui/material';

const AppointmentsListItem = (props) => {
  
  const {
    id,
    doctor_id,
    details,
    clinic_id,
    status,
    appointment
  } = props;
  
  const [confirmed, setConfirmed] = useState(status);

  const splitDate = details.split(" ")

  return(
    <Box marginBottom={"24px"}>
      <Card className="patient-appointments">
        <Box padding={"20px"}>
          <p>{confirmed ? "Approved" : "Pending"}</p>
          <p>You have an appointment {!confirmed && "requested"} on {splitDate[0]} at {splitDate[1]} with {doctor_id}.</p> 
          <p>Clinic address: {clinic_id}</p>
          <Button>Cancel</Button>
        </Box>
      </Card>
    </Box>
  )
}

export default AppointmentsListItem;