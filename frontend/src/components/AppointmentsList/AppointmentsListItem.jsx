import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Card,
  } from '@mui/material';

const AppointmentsListItem = (props) => {
  
  const {
    id,
    doctor_name,
    details,
    clinic_address,
    status,
    appointment
  } = props;
  
  const formattedDate = details.replace(":00.000Z", "").split("T");

  return(
    <Box marginBottom={"24px"}>
      <Card className="patient-appointments">
        <Box padding={"20px"}>
          <p>{status ? "Approved" : "Pending"}</p>
          <p>You have an appointment {!status && "requested"} on {formattedDate[0]} at {formattedDate[1]} with {doctor_name}.</p> 
          <p>Clinic address: {clinic_address}</p>
          <Button>Cancel</Button>
        </Box>
      </Card>
    </Box>
  )
}

export default AppointmentsListItem;