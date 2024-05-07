import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


const defaultTheme = createTheme();

export default function ClinicSignUpInfo() {

  const userId = sessionStorage.getItem('user_id');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userId) {
      const data = new FormData(event.currentTarget);
    axios.post(`http://localhost:8080/clinics`, {
      clinic_name: data.get('clinic_name'),
      address: data.get('address'),
      user_id: sessionStorage.getItem('user_id')
    })
    .catch(error => {
      console.error('Error:', error);
    });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Required information
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="clinic_name"
            label="Clinic name"
            name="clinic_name"
            autoComplete="clinic_name"
            autoFocus
            inputProps={{ minLength: 1 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="address"
            type="text"
            id="address"
            autoComplete="current-address"
            inputProps={{ minLength: 1 }}
          />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}