import React from "react";
import { useState } from "react";
import { useContext } from "react";
import UserSignedIn from '../GeneralComponents/UserSignedIn';
import { Snackbar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, InputLabel} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";


export default function PatientInfo() {

  const { userState, dispatch } = useContext(UserSignedIn);
  const navigate = useNavigate();

  const registerUserInfo = async (userData) => {
    const userId = sessionStorage.getItem("user_id");
   
    try {
      const response = await fetch('http://localhost:8080/register/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...userData, user_id: userId}),
      });
      
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      ;
      const responseData = await response.text();
      
      console.log(responseData, "patient info");
      if (userState.clinicInfo.clinic_id) {
        navigate("/register")
      } else {
        navigate("/profile");
      }

      return responseData;

    } catch (error) {
      console.error('Error registering user:', error);
    }
  };


  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    health_card: '',
    DOB: dayjs(new Date())
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
   
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData);
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      DOB: dayjs(date) 
    });
   
  };

  const validate = (formData) => {
    const errors = {};

    for (const key in formData) {
      
      if (!formData[key]) {
        errors[key] = `${key} is required`
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        
    const formErrors = validate(formData);

    if (Object.keys(formErrors).length === 0) {
      registerUserInfo(formData);
      dispatch({ type: "NEW_USER_INFO", payload: formData })
    } else {
      setErrors(formErrors);
      setOpenSnackbar(true);
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container component="main" maxWidth="xs" style={{
        marginTop: "5%"}}>
        <CssBaseline />
        <div >

          <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
            Please, fill in the required information to use the App
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  error={!!errors.name}
                  autoComplete="name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors.gender}
                  name="gender"
                  label="Gender"
                  id="gender"
                  autoComplete="gender"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors.health_card}
                  name="health_card"
                  label="Health Card"
                  id="health_card"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Date Of Birth</InputLabel>
                <DatePicker
                  value={formData.DOB} // Pass the selected date value
                  onChange={handleDateChange} // Use the date change handler
                  name="DOB"
                  renderInput={(params) => <TextField   {...params} />}
                  sx={{width: '100%'}}
                />
              </Grid>
       
             
              <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
            </Grid>
            </Grid>
           
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              message="Please correct the errors and resubmit the form."
            />
          </form>
        </div>
        <Box mt={5}>

        </Box>
      </Container>
    </LocalizationProvider>
  );
}