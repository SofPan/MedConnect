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
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { DatePicker, TimePicker } from '@mui/x-date-pickers';
  import dayjs from 'dayjs';


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

  const {singleAppointmentDisplay, setsingleAppointmentDisplay} = appointment;

  
  const [isEditing, setIsEditing] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState({
    id: appointment.id,
    patient_id: appointment.patient_id,
    doctor_id: appointment.doctor_id,
    patient_name: appointment.patient_name,
    doctor_name: appointment.doctor_name,
    start_time: dayjs(appointment.start_time),
    end_time: dayjs(appointment.end_time),
    clinic_id: appointment.clinic_id,
    status: true,
    created_at: new Date(appointment.created_at),
    clinic_address: appointment.clinic_address,
    clinic_name:appointment.clinic_name
  });
  const [selectedDoctor, setSelectedDoctor] = useState(appointment.doctor_name);
  const [doctors, setDoctors ] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(editedAppointment.clinic_name || appointment.clinic_name);
  
  
  console.log(typeof editedAppointment.start_time);
  
  
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

  const deleteAppointment = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }
  
      // Handle successful deletion
    } catch (error) {
      // Handle error
      console.error('Error deleting appointment:', error);
    }
  };

  const updateAppointment = async (editedAppointment) =>{
    
    try {
      const response = await fetch(`http://localhost:8080/appointments/:id`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body:
          JSON.stringify(editedAppointment)
        
      });
      
      if (!response.ok) {
        throw new Error('Failed to update appointment');
      }
      ;
      

    } catch (error) {
      console.log("Error", error);
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
    
    const fetchClinicName = async () => {
      const response = await getClinicName();
      setClinics(response);
    };
    fetchClinicName();
  },[]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  
  const handleDelete = async () => {
    const success = await deleteAppointment(appointment.id);
    console.log(success);
    if(success){
      setsingleAppointmentDisplay(!singleAppointmentDisplay);
    }
  };

  const handleSave = async () => {
    // Save edited appointment here
    setIsEditing(false);
    // You can perform any action, like sending data to backend
    console.log("edited appoijtment", editedAppointment);
    const user = await updateAppointment(editedAppointment);
    console.log("return from update app", user);
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
  const handleDateTimeChange = (field, newValue) => {
    setEditedAppointment(prevState => ({
        ...prevState,
        [field]: newValue
    }));
  };
  const handleBack = () =>{
    setsingleAppointmentDisplay(!singleAppointmentDisplay);
  }

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
     <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <DatePicker
                  label="Start Date"
                  value={editedAppointment.start_time}
                  onChange={(newValue) => handleDateTimeChange('start_time', newValue)}
                  disabled={!isEditing}
                  fullWidth
                  margin="normal"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  label="Start Time"
                  value={editedAppointment.start_time}
                  onChange={(newValue) => handleDateTimeChange('start_time', newValue)}
                  disabled={!isEditing}
                  fullWidth
                  margin="normal"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="End Date"
                  value={editedAppointment.end_time}
                  onChange={(newValue) => handleDateTimeChange('end_time', newValue)}
                  disabled={!isEditing}
                  fullWidth
                  margin="normal"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  label="End Time"
                  value={editedAppointment.end_time}
                  onChange={(newValue) => handleDateTimeChange('end_time', newValue)}
                  disabled={!isEditing}
                  fullWidth
                  margin="normal"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
          </Box>
        </LocalizationProvider>
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
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleBack}>
              Back
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