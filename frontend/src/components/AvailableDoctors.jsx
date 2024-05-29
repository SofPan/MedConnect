import ClinicsList from './ClinicsList/ClinicsList';
import SearchClinicsByAddressForm from './SearchClinicsByAddressForm';
import MapComponent from './MapComponent';
import SearchClinicsByDoctorForm from './SearchClinicsByDoctorForm';
import { useEffect, useState } from 'react';
import AccordionWrapper from './GeneralComponents/AccordionWrapper';
import { useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { Grid } from '@mui/material';
import BoxWithScroll from './GeneralComponents/BoxWithScroll';

const defaultCenter = {
  lat: 43.642567, // default latitude
  lng: -79.387054, // default longitude
};

const AvailableDoctors = () => {
  const [searchTermMarker, setSearchTermMarker] = useState(false)
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [mapClinics, setMapClinics] = useState([]);
  const [displayedClinics, setDisplayedClinics] = useState([]);
  const [mapDoctors, setMapDoctors] = useState([]);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });


useEffect(() => {
  const fetchClinics = async () => {
    try {
      const response = await axios.get('http://localhost:8080/clinics');
      setMapClinics(response.data);
      setDisplayedClinics(response.data)
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/doctors');
      setMapDoctors(response.data);
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  if (isLoaded) {
    fetchClinics();
    fetchDoctors();
  }
}, [isLoaded]);


  return (
    <Grid container spacing={2} maxWidth={"90%"} margin="0 auto" height="80vh">
      <Grid item xs={4} display="inline-flex" flexDirection="column">
        <AccordionWrapper title={"Search by doctor's name"}>
          <SearchClinicsByDoctorForm setCoordinates={setCoordinates} defaultCenter={defaultCenter} setDisplayedClinics={setDisplayedClinics} mapDoctors={mapDoctors} mapClinics={mapClinics}/>
        </AccordionWrapper>
          <SearchClinicsByAddressForm setCoordinates={setCoordinates} setSearchTermMarker={setSearchTermMarker} />
        <BoxWithScroll height="60vh">
          <ClinicsList searchCoordinates={coordinates} clinics={displayedClinics} />
        </BoxWithScroll>
      </Grid> 
      <Grid item xs={8} display="inline-flex" alignItems="center" justifyContent="center" height="100%">
        <MapComponent coordinates={coordinates} searchTermMarker={searchTermMarker} isLoaded={isLoaded} mapClinics={displayedClinics} setMapClinics={setMapClinics}/>
      </Grid>
    </Grid>
  );
};

export default AvailableDoctors;

