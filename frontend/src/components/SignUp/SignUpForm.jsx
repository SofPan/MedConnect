import React from "react";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useContext } from "react";
import { UserSignedIn } from "../../App";
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from "@mui/material";





export default function SignUp() {

  const { dispatch } = useContext(UserSignedIn);

  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    type: ''
});

// Change handler to update state
const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
        ...formData,
        [name]: value
    });
};


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({type: "NEW_USER", payload: formData})
    
  }

  return (
    <Container component="main" maxWidth="xs">
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
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <FormControl >
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={handleChange}
              >
                <FormControlLabel value="Patient" control={<Radio />} label="patient" name="type"/>
                <FormControlLabel value="Clinic" control={<Radio />} label="clinic" name="type"/>
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
        </form>
      </div>
      <Box mt={5}>

      </Box>
    </Container>
  );
}