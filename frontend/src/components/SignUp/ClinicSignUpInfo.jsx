import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import UserSignedIn from '../GeneralComponents/UserSignedIn';
import { useNavigate } from "react-router-dom";
import BasicModal from '../GeneralComponents/BasicModal';


export default function ClinicSignUpInfo() {

  const { userState, dispatch } = React.useContext(UserSignedIn);
  const [modalTitle, setModalTitle] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("")

  const navigate = useNavigate();

  // const userId = sessionStorage.getItem('user_id');
  const userId = userState.userInfo.user_id;

  console.log("inside clinci sign up",userState);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userId) {
      const data = new FormData(event.currentTarget);
    axios.post(`http://localhost:8080/clinics`, {
      clinic_name: data.get('clinic_name'),
      address: data.get('address'),
      user_id: userId
    })
    .then(() => {
      navigate("/profile")
    })
    .catch(error => {
      console.error('Error:', error);
      setModalTitle("Error")
      setErrorMessage("Please enter the correct clinic address.");
      dispatch({ type: "SET_MODAL", payload: true})
    });
    }
  };

  return (
      <Container component="main" maxWidth="xs" style={{
        marginTop: "5%"}}>
        <BasicModal title={modalTitle} message={errorMessage} />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
            Please, fill in the required information to use the App
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
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
            variant="outlined"
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
              color="primary"
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Container>
  );
}