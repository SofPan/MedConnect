import './App.css';
import { useEffect, useState, createContext } from 'react';
import NavBar from './components/NavBar';
import PatientScheduler from './components/Scheduling/PatientScheduler';
import useApplicationData from './hooks/useApplicationData';
import PatientInfo from './components/SignUp/PatientInfo';
import UserProfile from './components/UserProfile/UserProfile';
import { Grid } from '@mui/material';
import SignUp from './components/SignUp/SignUpForm';
import LoginForm from './components/LoginForm';
import ClinicSignUpInfo from './components/SignUp/ClinicSignUpInfo';
import AvailableDoctors from './components/AvailableDoctors';
import ClinicProfile from './components/UserProfile/ClinicProfile';
import AvailableDoctorsRoute from './routes/AvailableDoctorsRoute';
import PatientAppointments from '../../frontend/src/components/Scheduling/PatientAppointments'
export const UserSignedIn = createContext();


function App() {

  const { userState, dispatch } = useApplicationData();
  const [SignInDisplay, setSignInDisplay] = useState(false);
  const [LoginDisplay, setLoginDisplay] = useState(false);

  const getUserInfoForSession = async (userId) =>{
   
    try {
      const response = await fetch(`http://localhost:8080/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const responseData = await response.json();
      

     
      dispatch({ type: "USER_INFO", payload: responseData});

    } catch (error) {
      console.error('error getting user app.js:', error);
      
    }
  }
  

  useEffect(() => {

    const userId = sessionStorage.getItem('user_id');
    
    if (userId) {
      
      dispatch({ type: "USER_SESSION", payload: true })

      

      getUserInfoForSession(userId);

     
    } else {
      console.log("else statment hit");
      dispatch({ type: "USER_SESSION", payload: false })

    }
  }, []);

  console.log("userState", userState);



  return (
    <div className="App">
      <UserSignedIn.Provider value={{ userState, dispatch }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <NavBar setSignInDisplay={setSignInDisplay} SignInDisplay={SignInDisplay} LoginDisplay={LoginDisplay} setLoginDisplay={setLoginDisplay} />
          </Grid>
          <Grid item xs={12}>
            <PatientAppointments />
          </Grid>
          <Grid item xs={12}>
            <PatientInfo />
          </Grid>
          {SignInDisplay && (
            <Grid item xs={12}>
              <SignUp setSignInDisplay={setSignInDisplay} SignInDisplay={SignInDisplay} />
            </Grid>
          )}
          {LoginDisplay && (
            <Grid item xs={12}>
              <LoginForm />
            </Grid>
          )}

          {/* Centering PatientScheduler within a Material-UI grid */}
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: 'auto' }} // Optional: Set height to center vertically
          >
            <Grid item xs={10}  >
              <PatientScheduler  />
            </Grid>
          </Grid>
        </Grid>

        {/* Your other components */}
        {/* <ClinicSignUpInfo /> */}
        {/* <AvailableDoctorsRoute /> */}
      </UserSignedIn.Provider>
    </div>
  );
}

export default App;
