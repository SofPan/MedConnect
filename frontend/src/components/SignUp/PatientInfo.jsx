import React from "react";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useContext } from "react";
import { UserSignedIn } from "../../App";
import { Snackbar,Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


/* 
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


*/

export default function PatientInfo() {

  const { dispatch } = useContext(UserSignedIn);

  
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    DOB:'',
});
const [openSnackbar, setOpenSnackbar] = useState(false);
const [errors, setErrors] = useState({});

// Change handler to update state
const handleChange = (e) => {
    const { name, value } = e.target;
   
    setFormData({
        ...formData,
        [name]: value
    });
   
};

const validate = (formData) => {
  const errors = {};

  for(const key in formData){
    console.log(key);
    if(!formData[key]){
      errors[key] = `${key} is required`
    }
  }

  console.log(errors);

  // You can add more complex validation rules here

  return errors;
};


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const formErrors = validate(formData);
    if(formData.password === formData.password_check && Object.keys(formErrors).length === 0){
      dispatch({type: "NEW_USER", payload: formData})
    }else{
      setErrors(formErrors);
      setOpenSnackbar(true);
    }
   
    
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker />
    </LocalizationProvider>
      <CssBaseline />
      <div >

        <Typography component="h1" variant="h5">
          Sign up
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
                error={!!errors.email}
                autoComplete="name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={!!errors.password}
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
                name="password_check"
                label="Re-Type Password"
                type="password"
                id="password_check"
                error={!!errors.type}
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <FormControl >
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={handleChange}
                defaultValue="patient"
              >
                <FormControlLabel value="patient" control={<Radio />} label="Patient" name="type"  />
                <FormControlLabel value="clinic" control={<Radio />} label="Clinic" name="type" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"

          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
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
  );
}