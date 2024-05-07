import React, { useState, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import ClinicsList from './ClinicsList/ClinicsList';
import SearchClinicsByAddressForm from './SearchClinicsByAddressForm';
import MapComponent from './MapComponent';
import SearchClinicsByDoctorForm from './SearchClinicsByDoctorForm';

const defaultCenter = {
  lat: 43.642567, // default latitude
  lng: -79.387054, // default longitude
};

const AvailableDoctors = () => {
  const [searchTermMarker, setSearchTermMarker] = useState(false)
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [displayedClinics, setDisplayedClinics] = useState([])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (isLoaded) {
      axios.get('http://localhost:8080/clinics')
        .then(response => {
          setClinics(response.data);
          setDisplayedClinics(response.data);
        })
        .catch(error => {
          console.error('Error fetching clinics:', error);
        });
      axios.get('http://localhost:8080/doctors')
        .then(response => {
          setDoctors(response.data);
        })
        .catch(error => {
          console.error('Error fetching doctors:', error);
        });
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SearchClinicsByDoctorForm clinics={clinics} doctors={doctors} setDisplayedClinics={setDisplayedClinics} setCoordinates={setCoordinates} defaultCenter={defaultCenter}/>
      <SearchClinicsByAddressForm setCoordinates={setCoordinates} setSearchTermMarker={setSearchTermMarker}/>
      <MapComponent clinics={displayedClinics} coordinates={coordinates} searchTermMarker={searchTermMarker}/>
      <ClinicsList clinics={displayedClinics} doctors={doctors} searchCoordinates={coordinates} />
    </div>
  );
};

export default AvailableDoctors;
