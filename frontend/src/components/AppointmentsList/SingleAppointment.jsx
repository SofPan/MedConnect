import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Typography
  } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { putAppointment } from "../../hooks/tempUseAPI";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin: '20px',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const SingleAppointment = (props) => {

    const {
        doctor_name,
        details,
        clinic_address,
        status,
        appointment,
        user_id
      } = props;
 
console.log(props);
//   const [editing, setEditing] = useState(false);
//   const [appointmentDetails, setAppointmentDetails] = useState(appointment);

//   const splitDate = details.replace(":00.000Z", "").split("T");
//   const formattedDate = `${splitDate[0]} at ${splitDate[1]}`

//   useEffect(() => {
//     // PUT instead of DELETE because the Clinic should retain the appointment slot
//     const editAppointment = async () => {
//       await putAppointment(appointmentDetails);
//     };

//     if (editing){
//       editAppointment();
//     }
//   }, [editing]);

//   const handleClick = (e) => {
//     const editType = e.target.textContent;
//     setAppointmentDetails(prev => ({
//       ...prev,
//       patient_id: editType === "Cancel" ? null : user_id,
//       })
//     );
//     setEditing(true);
//   }

//   const classes = useStyles();

  return (
    <Card >
      <CardContent>
        <Typography variant="h5" component="h2">
          Appointment Details
        </Typography>
        <Typography  color="textSecondary" gutterBottom>
          Patient: {appointment.patient_name}
        </Typography>
        <Typography  color="textSecondary">
          Doctor: {appointment.doctor_name}
        </Typography>
        <Typography  color="textSecondary">
          Start Time: {new Date(appointment.start_time).toLocaleString()}
        </Typography>
        <Typography  color="textSecondary">
          End Time: {new Date(appointment.end_time).toLocaleString()}
        </Typography>
        <Typography  color="textSecondary">
          Address: {appointment.address}
        </Typography>
      </CardContent>
    </Card>
  );
};


export default SingleAppointment;