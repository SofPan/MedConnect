import ClinicsList from './ClinicsList/ClinicsList';
import SearchClinicsByAddressForm from './SearchClinicsByAddressForm';
import MapComponent from './MapComponent';
import SearchClinicsByDoctorForm from './SearchClinicsByDoctorForm';
import { useState } from 'react';
import AccordionWrapper from './GeneralComponents/AccordionWrapper';

const defaultCenter = {
  lat: 43.642567, // default latitude
  lng: -79.387054, // default longitude
};

const AvailableDoctors = () => {
  const [searchTermMarker, setSearchTermMarker] = useState(false)
  const [coordinates, setCoordinates] = useState(defaultCenter);

  return (
    <div>
      <AccordionWrapper title={"Search by doctor's name"}>
        <SearchClinicsByDoctorForm setCoordinates={setCoordinates} defaultCenter={defaultCenter}/>
      </AccordionWrapper>
      <SearchClinicsByAddressForm setCoordinates={setCoordinates} setSearchTermMarker={setSearchTermMarker}/>
      {/* <MapComponent coordinates={coordinates} searchTermMarker={searchTermMarker}/> */}
      <ClinicsList searchCoordinates={coordinates}/> 
    </div>
  );
};

export default AvailableDoctors;

