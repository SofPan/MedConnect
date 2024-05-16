import ClinicsList from './ClinicsList/ClinicsList';
import SearchClinicsByAddressForm from './SearchClinicsByAddressForm';
import MapComponent from './MapComponent';
import SearchClinicsByDoctorForm from './SearchClinicsByDoctorForm';
import { useContext, useEffect, useState } from 'react';
import AccordionWrapper from './GeneralComponents/AccordionWrapper';
import { UserSignedIn } from '../App';
import { useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { Grid } from '@mui/material';

const defaultCenter = {
  lat: 43.642567, // default latitude
  lng: -79.387054, // default longitude
};

const AvailableDoctors = () => {
  const [searchTermMarker, setSearchTermMarker] = useState(false)
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [mapClinics, setMapClinics] = useState([]);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });


console.log("isLoaded", isLoaded)

useEffect(() => {
  const fetchClinics = async () => {
    try {
      const response = await axios.get('http://localhost:8080/clinics');
      console.log(response.data)
      setMapClinics(response.data);
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  if (isLoaded) {
    fetchClinics();
  }
}, [isLoaded]);


  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <AccordionWrapper title={"Search by doctor's name"}>
          <SearchClinicsByDoctorForm setCoordinates={setCoordinates} defaultCenter={defaultCenter} setMapClinics={setMapClinics}/>
        </AccordionWrapper>
        <SearchClinicsByAddressForm setCoordinates={setCoordinates} setSearchTermMarker={setSearchTermMarker} />
        <ClinicsList searchCoordinates={coordinates} clinics={mapClinics} />
      </Grid> 
      <Grid item xs={8}>
        <MapComponent coordinates={coordinates} searchTermMarker={searchTermMarker} isLoaded={isLoaded} mapClinics={mapClinics} setMapClinics={setMapClinics}/>
      </Grid>
    </Grid>
  );
};

export default AvailableDoctors;

