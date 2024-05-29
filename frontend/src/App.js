import './App.css';
import { useEffect, useState, createContext } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import NavBar from './components/NavBar';
import useApplicationData from './hooks/useApplicationData';
import UserProfile from './components/UserProfile/UserProfile';
import SignUp from './components/SignUp/SignUpForm';
import AvailableDoctors from './components/AvailableDoctors';
import RegisterWithDoctor from './components/DoctorsList/RegisterWithDoctor';
import LandingPage from './components/LandingPage';
import RequiredInformation from './components/SignUp/RequiredInformation';
import BasicModal from './components/GeneralComponents/BasicModal';
import { MotionWrapper } from './components/GeneralComponents/MotionWrapper';

export const UserSignedIn = createContext();

function App() {

  const { userState, dispatch } = useApplicationData();
  const [LoginDisplay, setLoginDisplay] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const getUserInfoForSession = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/profile/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      const responseData = await response.json();
      dispatch({ type: "USER_INFO", payload: responseData });
      return responseData;
    } catch (error) {
      console.error('error getting user app.js:', error);
    }
  }

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      dispatch({ type: "USER_SESSION", payload: true });
      getUserInfoForSession(userId);
    } else {
      dispatch({ type: "USER_SESSION", payload: false });
    }
  }, []);

  useEffect(() => {
    if (userState.userInfo.id && loading) {
      setLoading(false);
    }
  }, [userState.userInfo.id, loading]);



  return (
    <div className="App" >
      <UserSignedIn.Provider value={{ userState, dispatch }}>
        <NavBar LoginDisplay={LoginDisplay} setLoginDisplay={setLoginDisplay} loading={loading} />
        <BasicModal />
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<MotionWrapper><LandingPage /></MotionWrapper>} />
            <Route path='/availabledoctors' element={<MotionWrapper><AvailableDoctors /></MotionWrapper>} />
            <Route path='/register' element={<MotionWrapper><RegisterWithDoctor /></MotionWrapper>} />
            <Route path='/profile' element={<MotionWrapper>{!loading && <UserProfile />}</MotionWrapper>} />
            <Route path='/signup' element={<MotionWrapper><SignUp setLoginDisplay={setLoginDisplay} /></MotionWrapper>} />
            <Route path='/required_information' element={<MotionWrapper><RequiredInformation /></MotionWrapper>} />
          </Routes>
        </AnimatePresence>
      </UserSignedIn.Provider>
    </div>
  );
}


export default App;
