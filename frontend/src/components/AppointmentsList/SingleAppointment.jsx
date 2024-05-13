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
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(editedAppointment.clinic_name || appointment.clinic_name);

  

  

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
            address: clinic.address,
            id: clinic.id
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
      console.log("response from get dovtos of a clinic", response);
      setDoctors(response);
      
    };
   
    fetchDoctors();

    
  },[editedAppointment.clinic_id]);

  useEffect(()=>{
    console.log("fetch clinic name fired");
    const fetchClinicName = async () => {
      const response = await getClinicName();
      setClinics(response);
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
    console.log(editedAppointment);
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
    const selectedClinicName = e.target.innerText;
    
    setEditedAppointment(prevState => ({ ...prevState, clinic_name: selectedClinicName }));
    try {
        const clinicIdResponse = clinics.find((clinic)=> clinic.name === selectedClinicName);
        const clinic_id = clinicIdResponse.id; 
        setEditedAppointment(prevState => ({ ...prevState, clinic_id: clinic_id }));
    } catch (error) {
        console.log("clinic id response error", error);
    }
    try {
      const clinicAddressResponse = clinics.find((clinic)=> clinic.name === selectedClinicName);
      const clinic_address = clinicAddressResponse.address; 
      setEditedAppointment(prevState => ({ ...prevState, clinic_address: clinic_address}));
  } catch (error) {
      console.log("clinic id response error", error);
  }
    console.log("handle clinic change", editedAppointment);
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
      {clinics && clinics.length > 0 && (
        <TextField
          select
          name="clinic_name"
          label="Clinic"
          value={editedAppointment.clinic_name}
          onClick={handleClinicChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        >
          {clinics.map((address, index) => (
            <MenuItem key={index} value={address.name} >
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