import ClinicsList from './ClinicsList/ClinicsList';
import SearchClinicsByAddressForm from './SearchClinicsByAddressForm';
import MapComponent from './MapComponent';
import SearchClinicsByDoctorForm from './SearchClinicsByDoctorForm';
import { useContext } from 'react';
import { UserSignedIn } from '../App';


const AvailableDoctors = (props) => {
  const { searchTermMarker, setSearchTermMarker, coordinates, setCoordinates, displayedClinics, setDisplayedClinics, defaultCenter, handleRequestToRegister } = props;


  return (
    <div>
      <SearchClinicsByDoctorForm setDisplayedClinics={setDisplayedClinics} setCoordinates={setCoordinates} defaultCenter={defaultCenter}/>
      <SearchClinicsByAddressForm setCoordinates={setCoordinates} setSearchTermMarker={setSearchTermMarker}/>
      {/* <MapComponent displayedClinics={displayedClinics} coordinates={coordinates} searchTermMarker={searchTermMarker}/> */}
      <ClinicsList displayedClinics={displayedClinics} searchCoordinates={coordinates} handleRequestToRegister={handleRequestToRegister}/> 
    </div>
  );
};

export default AvailableDoctors;

