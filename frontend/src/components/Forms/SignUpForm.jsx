import React from "react";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { useContext } from "react";
import UserSignedIn from '../GeneralComponents/UserSignedIn';
import { useNavigate } from "react-router-dom";
import { Snackbar, Button, CssBaseline, TextField, FormControlLabel, Link, Grid, Box, Typography, Container } from "@mui/material";
import BasicModal from "../GeneralComponents/BasicModal";

export default function SignUp() {
  const navigate = useNavigate();
  const { dispatch, setLoginDisplay } = useContext(UserSignedIn);
  const [modalTitle, setModalTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_check: '',
    type: 'Patient'
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
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

  const registerUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      ;
      const responseData = await response.json();
      return responseData;

    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validate(formData);
    if (formData.password === formData.password_check && Object.keys(formErrors).length === 0) {
        try {
          const userResponse = await registerUser(formData);

          const user = {...userResponse, user_id: userResponse.id}

          
          
          sessionStorage.setItem("user_id", user.id);

          dispatch({ type: "USER_INFO", payload: user });
    
          dispatch({ type: "USER_LOGIN", payload: true });

          navigate("/required_information");
          

          setLoginDisplay(false);
                    
        } catch (error) {
          console.error('Registration failed', error);
          setModalTitle("Error")
          setErrorMessage("A user with this email address has already been registered");
          dispatch({ type: "SET_MODAL", payload: true})
        }
      
    } else {
        setErrors(formErrors);
        setOpenSnackbar(true);
    }
};

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" style={{
      marginTop: "5%",
  }}>
      <BasicModal title={modalTitle} message={errorMessage}/>
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
                id="email"
                label="Email Address"
                name="email"
                error={!!errors.email}
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={!!errors.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
            <Grid item xs={12} className="grid-radio-container">
              <FormControl  >
                <RadioGroup
                 className="radio-container"
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  onChange={handleChange}
                  defaultValue="patient"
                >
                  <FormControlLabel value="patient" control={<Radio />} label="Patient" name="type" />
                  <FormControlLabel value="clinic" control={<Radio />} label="Clinic" name="type" />
                </RadioGroup>
              </FormControl>
            </Grid>
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
    </Container>
  );
}