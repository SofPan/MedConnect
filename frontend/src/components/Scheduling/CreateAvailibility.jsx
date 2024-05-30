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
  import dayjs from "dayjs";
  import { UserSignedIn } from "../../App";

import GlobalStyles from '@mui/material/GlobalStyles';


 

 

const StyledBox= styled(Box)({
  minWidth: 275,
  margin: "20px",
});

const StyledTypography = styled(Typography)({
  fontSize: 14,
  fontWeight: "bold",
  marginBottom: 10,
});

const CreateAvailibility = ({availabilityDisplay, setAvailabilityDisplay, appointment}) => {
  
  const timePickerMinTime = dayjs().set('hour', 9).set('minute', 0).set('second', 0).set('millisecond', 0);
  const timePickerMaxTime = dayjs().set('hour', 17);

  const { userState } = useContext(UserSignedIn);


  const [errors, setErrors ] = useState([])
  const [availibility, setAvailibility] = useState({
    doctor_id: {
      value: '',
      error: false
    },
    doctor_name: {
      value: '',
      error: false
    },
    start_time: {
      value: null,
      error: false
    },
    end_time:  {
      value: null,
      error: false
    },
    clinic_id: userState.userInfo.id,
    status: false,
    created_at: new Date(),
    clinic_address: userState.userInfo.address,
    clinic_name: userState.userInfo.name
  });

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

    let newErrors = {};

    for (const [key, value] of Object.entries(availibility)) {
      
      if (value.hasOwnProperty("value") && !value.value) {
        
        setAvailibility(prev => ({
          ...prev,
          [key]: { ...prev[key], error: true } // Correct syntax to update the error property
        }));
        newErrors[key] = true;
      }
    }
    console.log(availibility);
    debugger;
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Construct the data to be sent to the backend
      const data = {
        start_time: availibility.start_time.value,
        end_time: availibility.end_time.value,
        clinic_name: availibility.clinic_name,
        doctor_name: availibility.doctor_name.value,
        // Add other fields as needed
      };
    }
  };

  const handleCancel = () => {
   
    setAvailabilityDisplay(!availabilityDisplay);
    // Reset edited appointment to original appointment
    
  };



  const handleDoctorChange = (e) => {
    const selectedDoctor = userState.doctors.find((doc) => doc.name === e.target.value);
    const doctor_id = selectedDoctor ? selectedDoctor.id : null;
    setAvailibility(prev =>({ ...prev, doctor_name:{...prev.doctor_name, value: e.target.value}, doctor_id: doctor_id }));
  };

  

  const handleDateTimeChange = (field, newValue) => {
    setAvailibility(prevState => ({
        ...prevState,
        [field]: newValue
    }));
  };
  

  return (
  <Box 
  component="form"
  noValidate >
    <CardContent>
      <StyledTypography variant="h5">
        Create Open Availibility Between Selected Time Frame
      </StyledTypography>
      {doctors && doctors.length > 0 && (
        <TextField
          select
          name="doctor_name"
          label="Doctor"
          onChange={handleDoctorChange}
          fullWidth
          error={availibility.doctor_name.error}

          margin="normal"
        >
          {doctors.map((doctor, index) => (
            <MenuItem key={index} value={doctor} >
              {doctor}
              

            </MenuItem>
          ))}
        </TextField>
      )}
     <LocalizationProvider dateAdapter={AdapterDayjs}>
     <GlobalStyles styles={{
        '.MuiClockPicker-root .MuiClockPicker-clock, .MuiClockPicker-root .MuiClockPicker-arrowSwitcher': {
          '&::-webkit-scrollbar': {
            width: '12px',
            height: '12px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'red',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'red',
            },
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'red',
          },
        },
      }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <DatePicker
                  label="Start Date"
                  value={availibility.start_time.value}
                  onChange={(newValue) => handleDateTimeChange('start_time', newValue)}
                  fullWidth
                  
                  margin="normal"
                  slotProps={{
                    textField: {
                      
                      variant: 'outlined',
                      error: availibility.start_time.error
                    
                    }}}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                ampm={false}
                  label="Start Time"
                  value={availibility.start_time.value}
                  onChange={(newValue) => handleDateTimeChange('start_time', newValue)}
                  fullWidth
                  margin="normal"
                  minTime={timePickerMinTime}
                  maxTime={timePickerMaxTime}
                  timeSteps={{ minutes: 15 }}
                  openTo="hours"
                  slotProps={{
                    textField: {
                      
                      variant: 'outlined',
                      error: availibility.start_time.error
                    
                    }}}
                 
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="End Date"
                  value={availibility.end_time.value}
                  onChange={(newValue) => handleDateTimeChange('end_time', newValue)}
                  fullWidth
                  margin="normal"
                  slotProps={{
                    textField: {
                      
                      variant: 'outlined',
                      error: availibility.end_time.error
                    
                    }}}

                 
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  ampm={false}
                 openTo="hours"
                  label="End Time"
                  value={availibility.end_time.value}
                  onChange={(newValue) => handleDateTimeChange('end_time', newValue)}
                  fullWidth
                  timeSteps={{ minutes: 15 }}
                  margin="normal"
                  minTime={timePickerMinTime}
                  maxTime={timePickerMaxTime}
                  slotProps={{
                    textField: {
                      
                      variant: 'outlined',
                      error: availibility.end_time.error
                    
                    }}}
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
  </Box>
);
};



export default CreateAvailibility;