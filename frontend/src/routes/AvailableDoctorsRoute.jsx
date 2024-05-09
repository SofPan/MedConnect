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
  const [searchTermMarker, setSearchTermMarker] = useState(false)
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [displayedClinics, setDisplayedClinics] = useState(userState.clinics);
  const [displayOneClinic, setDisplayOneClinic] = useState({
    display: false,
    clinicInfo: {}
  });

  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });


  useEffect (() => {
    setDisplayedClinics(userState.clinics)
  }, [userState.clinics, isLoaded])

  const handleRequestToRegister = (info) => {
    setDisplayOneClinic({
      display: true,
      clinicInfo: info
    })
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {displayOneClinic.display ? 
        <RegisterWithDoctor 
          clinicInfo={displayOneClinic.clinicInfo}
        /> : 
        <AvailableDoctors 
          searchTermMarker={searchTermMarker} 
          setSearchTermMarker={setSearchTermMarker} 
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
