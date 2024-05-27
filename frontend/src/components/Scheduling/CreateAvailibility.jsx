import { useEffect, useState, useContext} from "react";

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
  import { UserSignedIn } from "../../App";

const StyledCard = styled(Card)({
  minWidth: 275,
  margin: "20px",
});

const StyledTypography = styled(Typography)({
  fontSize: 14,
  fontWeight: "bold",
  marginBottom: 10,
});

const CreateAvailibility = ({availabilityDisplay, setAvailabilityDisplay, appointment}) => {

  const { userState } = useContext(UserSignedIn);


  
  const [availibility, setAvailibility] = useState({
    id: userState.userInfo.id,
    patient_id: '',
    patient_name:'',
    doctor_id: '',
    doctor_name: '',
    start_time: null,
    end_time: null,
    clinic_id: userState.userInfo.id,
    status: false,
    created_at: new Date(),
    clinic_address: userState.userInfo.address,
    clinic_name: userState.userInfo.name
  });

  const [selectedDoctor, setSelectedDoctor] = useState(availibility.doctor_name);
  const [doctors, setDoctors ] = useState([]);

  
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
  
      return true;
    } catch (error) {
      // Handle error
      console.error('Error deleting appointment:', error);
    }
  };

  const updateAppointment = async (availibility) =>{
    
    try {
      const response = await fetch(`http://localhost:8080/appointments/:id`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body:
          JSON.stringify(availibility)
        
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
      const response = await getDoctors(availibility.clinic_id);
      setDoctors(response);
    };

    fetchDoctors();

  },[]);

 

  
  const handleDelete = async () => {
    const success = await deleteAppointment(appointment.id);
  }

  const handleSave = async () => {
    // Save edited appointment here
    setAvailabilityDisplay(!availabilityDisplay);
    // You can perform any action, like sending data to backend
    
   
    
  };

  const handleCancel = () => {
   
    setAvailabilityDisplay(!availabilityDisplay);
    // Reset edited appointment to original appointment
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvailibility(prevState => ({ ...prevState, [name]: value }));
  };

  
  


  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
    setAvailibility(prevState =>({ ...prevState, doctor_name: e.target.value }));
  };

  const handleDateTimeChange = (field, newValue) => {
    setAvailibility(prevState => ({
        ...prevState,
        [field]: newValue
    }));
  };
  

  return (
  <StyledCard variant="outlined">
    <CardContent>
      <StyledTypography variant="h5">
        Create Open Availibility Between Selected Time Frame
      </StyledTypography>
      {doctors && doctors.length > 0 && (
        <TextField
          select
          name="doctor_name"
          label="Doctor"
          value={selectedDoctor}
          onChange={handleDoctorChange}
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
                  value={availibility.start_time}
                  onChange={(newValue) => handleDateTimeChange('start_time', newValue)}
                  fullWidth
                  margin="normal"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  label="Start Time"
                  value={availibility.start_time}
                  onChange={(newValue) => handleDateTimeChange('start_time', newValue)}
                  fullWidth
                  margin="normal"
                  minutesStep={30}
                  openTo="hours"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="End Date"
                  value={availibility.end_time}
                  onChange={(newValue) => handleDateTimeChange('end_time', newValue)}
                  fullWidth
                  margin="normal"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                 openTo="hours"
                  label="End Time"
                  value={availibility.end_time}
                  onChange={(newValue) => handleDateTimeChange('end_time', newValue)}
                  fullWidth
                  minutesStep={30}
                  margin="normal"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
          </Box>
        </LocalizationProvider>
        <TextField
          
          name="clinic_name"
          label="Clinic"
          value={availibility.clinic_name}
          fullWidth
          margin="normal"
        ></TextField>
          
      
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
      
    </CardContent>
  </StyledCard>
);
};



export default CreateAvailibility;