import ClinicsList from './ClinicsList/ClinicsList';
import SearchClinicsByAddressForm from './SearchClinicsByAddressForm';
import MapComponent from './MapComponent';
import SearchClinicsByDoctorForm from './SearchClinicsByDoctorForm';
import { useState } from 'react';

const defaultCenter = {
  lat: 43.642567, // default latitude
  lng: -79.387054, // default longitude
};

const AvailableDoctors = () => {
  const [searchTermMarker, setSearchTermMarker] = useState(false)
  const [coordinates, setCoordinates] = useState(defaultCenter);

  return (
    <div>
      <SearchClinicsByDoctorForm setCoordinates={setCoordinates} defaultCenter={defaultCenter}/>
      <SearchClinicsByAddressForm setCoordinates={setCoordinates} setSearchTermMarker={setSearchTermMarker}/>
      {/* <MapComponent coordinates={coordinates} searchTermMarker={searchTermMarker}/> */}
      <ClinicsList searchCoordinates={coordinates}/> 
    </div>
  );
};

export default AvailableDoctors;

