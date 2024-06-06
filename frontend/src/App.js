import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import NavBar from './components/GeneralComponents/NavBar';
import UserProfile from './components/UserProfile/UserProfile';
import SignUp from './components/Forms/SignUpForm';
import AvailableDoctors from './routes/AvailableDoctors';
import RegisterWithDoctor from './components/DoctorsList/RegisterWithDoctor';
import LandingPage from './routes/LandingPage';
import RequiredInformation from './components/SignUp/RequiredInformation';
import BasicModal from './components/GeneralComponents/BasicModal';
import { MotionWrapper } from './components/GeneralComponents/MotionWrapper';
import './App.css';
import UserSignedIn from './components/GeneralComponents/UserSignedIn';


function App() {
  const { location, loading } = useContext(UserSignedIn);

  return (
    <div className="App">
      <NavBar />
      <BasicModal />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<MotionWrapper><LandingPage /></MotionWrapper>} />
          <Route path='/availabledoctors' element={<MotionWrapper><AvailableDoctors /></MotionWrapper>} />
          <Route path='/register' element={<MotionWrapper><RegisterWithDoctor /></MotionWrapper>} />
          <Route path='/profile' element={<MotionWrapper>{!loading && <UserProfile />}</MotionWrapper>} />
          <Route path='/signup' element={<MotionWrapper><SignUp /></MotionWrapper>} />
          <Route path='/required_information' element={<MotionWrapper><RequiredInformation /></MotionWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
