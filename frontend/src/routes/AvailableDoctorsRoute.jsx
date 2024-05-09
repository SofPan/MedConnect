import React, { useState, useEffect, useContext } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import AvailableDoctors from '../components/AvailableDoctors';
import RegisterWithDoctor from '../components/DoctorsList/RegisterWithDoctor';
import { UserSignedIn } from '../App';

const defaultCenter = {
  lat: 43.642567, // default latitude
  lng: -79.387054, // default longitude
};

const AvailableDoctorsRoute = () => {
  const { userState } = useContext(UserSignedIn);
  console.log(userState)

  const [searchTermMarker, setSearchTermMarker] = useState(false)
  // const [clinics, setClinics] = useState([]);
  // const [doctors, setDoctors] = useState([]);
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [displayedClinics, setDisplayedClinics] = useState(userState.clinics);
  const [displayOneClinic, setDisplayOneClinic] = useState({
    display: false,
    clinicInfo: {}
  });

  useEffect (() => {
    setDisplayedClinics(userState.clinics)
  }, [userState.clinics])

  const handleRequestToRegister = (info) => {
    setDisplayOneClinic({
      display: true,
      clinicInfo: info
    })
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // useEffect(() => {
  //     axios.get('http://localhost:8080/clinics')
  //       .then(response => {
  //         setClinics(response.data);
  //         setDisplayedClinics(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching clinics:', error);
  //       });
  //     axios.get('http://localhost:8080/doctors')
  //       .then(response => {
  //         setDoctors(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching doctors:', error);
  //       });
    
  // }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {displayOneClinic.display ? 
        <RegisterWithDoctor 
          // doctors={userState.doctors} 
          clinicInfo={displayOneClinic.clinicInfo}
        /> : 
        <AvailableDoctors 
          searchTermMarker={searchTermMarker} 
          setSearchTermMarker={setSearchTermMarker} 
          // clinics={userState.clinics} 
          // doctors={userState.doctors} 
          // clinics={clinics} 
          // doctors={doctors} 
          coordinates={coordinates} 
          setCoordinates={setCoordinates} 
          displayedClinics={displayedClinics} 
          setDisplayedClinics={setDisplayedClinics} 
          defaultCenter={defaultCenter} 
          handleRequestToRegister={handleRequestToRegister}
      /> 
      }
    </div>
  );
};

export default AvailableDoctorsRoute;
