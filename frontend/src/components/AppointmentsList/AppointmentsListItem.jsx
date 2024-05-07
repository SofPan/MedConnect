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
    appointment
  } = props;
  
  const [cancelling, setCancelling] = useState(false);

  const formattedDate = details.replace(":00.000Z", "").split("T");

  useEffect(() => {
    // PUT instead of DELETE because the Clinic should retain the appointment slot
    const cancelAppointment = async () => {
      await putAppointment(appointment);
    };

    if (cancelling){
      cancelAppointment();
    }
  }, [cancelling]);

  return(
    <Box marginBottom={"24px"}>
      <Card className="patient-appointments">
        <Box padding={"20px"}>
          <p>{status ? "Approved" : "Pending"}</p>
          <p>You have an appointment {!status && "requested"} on {formattedDate[0]} at {formattedDate[1]} with {doctor_name}.</p> 
          <p>Clinic address: {clinic_address}</p>
          <Button onClick={() => setCancelling(true)}>Cancel</Button>
        </Box>
      </Card>
    </Box>
  )
}

export default AppointmentsListItem;