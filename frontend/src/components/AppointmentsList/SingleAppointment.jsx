import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    MenuItem
  } from '@mui/material';
  import { styled } from '@mui/system';
import { putAppointment } from "../../hooks/tempUseAPI";

const StyledCard = styled(Card)({
  minWidth: 275,
  margin: "20px",
});

const StyledTypography = styled(Typography)({
  fontSize: 14,
  fontWeight: "bold",
  marginBottom: 10,
});

const SingleAppointment = (appointment) => {


  const handleDelete = () => {
    // Implement delete functionality here
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState(appointment);
  const [selectedDoctor, setSelectedDoctor] = useState(appointment.doctor_name);
  const [doctors, setDoctors ] = useState([]);
  const [clinicName, setClinicName] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(appointment.clinic_name);

  

  const getClinicIdByName = async (clinic_name) =>{
    try {
      const response = await fetch(`http://localhost:8080/clinicName/${clinic_name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      ;
      const responseData = await response.json();
      
      return responseData;
      // Assuming the response contains some information about the newly registered user
      // You can handle the response data as needed
      
      

    } catch (error) {
      // Handle error
    }
  }

  const getDoctors = async (clinic_id) =>{
    try {
      const response = await fetch(`http://localhost:8080/doctors/${clinic_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      ;
      const responseData = await response.json();
      
      const filtererdData = responseData.map((doctor)=>{
        return doctor.name;
      })
      // Assuming the response contains some information about the newly registered user
      // You can handle the response data as needed
      
      return filtererdData;

    } catch (error) {
      // Handle error
    }
  }

  const getClinicName = async () =>{
    try {
      const response = await fetch(`http://localhost:8080/clinics/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      ;
      const responseData = await response.json();
      
      const filtererdData = responseData.map((clinic)=>{
        return(
          {
            name:clinic.name,
            address: clinic.address
          }
        )
      })
      // Assuming the response contains some information about the newly registered user
      // You can handle the response data as needed
      
      return filtererdData;

    } catch (error) {
      // Handle error
    }
  }

  useEffect(()=>{
    const fetchDoctors = async () => {
      const response = await getDoctors(editedAppointment.clinic_id);
      setDoctors(response);
    };
    fetchDoctors();

    
  },[editedAppointment.clinic_name]);

  useEffect(()=>{
    const fetchClinicName = async () => {
      const response = await getClinicName(appointment.clinic_id);
      setClinicName(response);
    };
    fetchClinicName();
  },[]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save edited appointment here
    setIsEditing(false);
    // You can perform any action, like sending data to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset edited appointment to original appointment
    setEditedAppointment(appointment);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAppointment({ ...editedAppointment, [name]: value });
  };

  
  const handleClinicChange = async (e) => {

    setSelectedClinic(e.target.value);
    setEditedAppointment({ ...editedAppointment, clinic_name: e.target.value });

    try {
      const clinicIdResponse = await getClinicIdByName(e.target.value);
      const clinicId = clinicIdResponse[0].id; // Assuming the response returns an array with the clinic ID at index 0
      setEditedAppointment({ ...editedAppointment, clinic_id: clinicId });
    } catch (error) {
    }
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
    setEditedAppointment({ ...editedAppointment, doctor_name: e.target.value });
  };

  return (
  <StyledCard variant="outlined">
    <CardContent>
      <StyledTypography variant="h5">
        Appointment Details
      </StyledTypography>
      <TextField
        name="patient_name"
        label="Patient"
        value={editedAppointment.patient_name}
        onChange={handleChange}
        disabled={!isEditing}
        fullWidth
        margin="normal"
      />
      {doctors && doctors.length > 0 && (
        <TextField
          select
          name="doctor_name"
          label="Doctor"
          value={selectedDoctor}
          onChange={handleDoctorChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        >
          {doctors.map((doctor, index) => (
            <MenuItem key={index} value={doctor}>
              {doctor}
            </MenuItem>
          ))}
        </TextField>
      )}
      <TextField
        name="start_time"
        label="Start Time"
        value={editedAppointment.start_time}
        onChange={handleChange}
        disabled={!isEditing}
        fullWidth
        margin="normal"
      />
      <TextField
        name="end_time"
        label="End Time"
        value={editedAppointment.end_time}
        onChange={handleChange}
        disabled={!isEditing}
        fullWidth
        margin="normal"
      />
      {clinicName && clinicName.length > 0 && (
        <TextField
          select
          name="clinic_name"
          label="Clinic"
          value={editedAppointment.clinic_name}
          onChange={handleClinicChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        >
          {clinicName.map((address, index) => (
            <MenuItem key={index} value={address.name}>
              {address.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      {!isEditing ? (
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      )}
    </CardContent>
  </StyledCard>
);
};



export default SingleAppointment;