import React, { useState, useEffect } from 'react';
import { useJsApiLoader} from '@react-google-maps/api';
import axios from 'axios';
import ClinicsList from './ClinicsList/ClinicsList';
import MapComponent from './MapComponent';
import SearchClinicsByAddressForm from './SearchClinicsByAddressForm';


const defaultCenter = {
  lat: 43.642567, // default latitude
  lng: -79.387054, // default longitude
};


const AvailableDoctors = () => {
  const [clinics, setClinics] = useState([]);
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [searchTermMarker, setSearchTermMarker] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchClinics = () => {
      axios.get('http://localhost:8080/clinics')
        .then(response => {
          setClinics(response.data);
        })
        .catch(error => {
          console.error('Error fetching clinics:', error);
        });
    };
    if (isLoaded) {
      fetchClinics();
    }
  }, [isLoaded]);

 

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SearchClinicsByAddressForm setCoordinates={setCoordinates} setSearchTermMarker={setSearchTermMarker}/>
      <MapComponent clinics={clinics} coordinates={coordinates} searchTermMarker={searchTermMarker}/>
      <ClinicsList searchCoordinates={coordinates} />
    </div>
  );
};

export default AvailableDoctors;
