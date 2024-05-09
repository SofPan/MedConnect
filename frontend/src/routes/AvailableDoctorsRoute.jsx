import React, { useState, useEffect, useContext } from 'react';
import AvailableDoctors from '../components/AvailableDoctors';
import RegisterWithDoctor from '../components/DoctorsList/RegisterWithDoctor';

const defaultCenter = {
  lat: 43.642567, // default latitude
  lng: -79.387054, // default longitude
};

const AvailableDoctorsRoute = () => {
  const [searchTermMarker, setSearchTermMarker] = useState(false)
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [displayOneClinic, setDisplayOneClinic] = useState({
    display: false,
    clinicInfo: {}
  });

  const handleRequestToRegister = (info) => {
    setDisplayOneClinic({
      display: true,
      clinicInfo: info
    })
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
          defaultCenter={defaultCenter} 
          handleRequestToRegister={handleRequestToRegister}
      /> 
      }
    </div>
  );
};

export default AvailableDoctorsRoute;
