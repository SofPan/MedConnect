import './App.css';
import { useEffect, useState, createContext } from 'react';
import NavBar from './components/NavBar';
import PatientScheduler from './components/Scheduling/PatientScheduler';
import useApplicationData from './hooks/useApplicationData';
import PatientInfo from './components/SignUp/PatientInfo';
import UserProfile from './components/UserProfile/UserProfile';

import SignUp from './components/SignUp/SignUpForm';
import LoginForm from './components/LoginForm';
import ClinicSignUpInfo from './components/SignUp/ClinicSignUpInfo';

export const UserSignedIn = createContext();


function App() {

  const { userState, dispatch } = useApplicationData();
  const [SignInDisplay, setSignInDisplay] = useState(false);
  const [LoginDisplay, setLoginDisplay] = useState(false);


  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {

      dispatch({ type: "USER_SESSION", payload: true })

    } else {
      console.log("else statment hit");
      dispatch({ type: "USER_SESSION", payload: false })

    }
  }, []);



  return (

    <div className="App" >

      <UserSignedIn.Provider value={{ userState, dispatch }}>
        {/* <PatientInfo />
         */}
        <NavBar setSignInDisplay={setSignInDisplay} SignInDisplay={SignInDisplay} LoginDisplay={LoginDisplay} setLoginDisplay={setLoginDisplay} />
        {SignInDisplay && (<>
          < SignUp setSignInDisplay={setSignInDisplay} SignInDisplay={SignInDisplay}/>

        </>)}
        {LoginDisplay && <LoginForm />}
       
     

        
        
        <PatientScheduler />
        <ClinicSignUpInfo />
      

      </UserSignedIn.Provider>

    </div>

  );
}

export default App;
