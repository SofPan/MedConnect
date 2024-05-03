import './App.css';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import PatientScheduler from './components/Scheduling/PatientScheduler';
import useApplicationData from './hooks/useApplicationData';

import MapComponent from './components/MapComponent';
import ClinicList from './components/ClinicsList/ClinicsList'

export const UserSignedIn = createContext();


function App() {

  const {userState, dispatch} = useApplicationData();



  //This part doesn't work/////
  // useEffect(() => {
  //   axios.get(`http://localhost:8080/`)
  //     .then(res => {
  //       console.log(res.data)
  //       setUser(res.data);
  //     })
  //     .catch(error => console.error('Error fetching user:', error));
  // }, []); 
  //////////////////
 

  return (
   
    <div className="App">

       <UserSignedIn.Provider value={{ userState, dispatch }}>
        <NavBar />
      </UserSignedIn.Provider> 

      
      <PatientScheduler />
      <MapComponent />
     
    </div>
    
  );
}

export default App;
