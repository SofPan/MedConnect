import ClinicsList from './ClinicsList/ClinicsList';
import SearchClinicsByAddressForm from './SearchClinicsByAddressForm';
import MapComponent from './MapComponent';
import SearchClinicsByDoctorForm from './SearchClinicsByDoctorForm';

const AvailableDoctors = (props) => {
  const { searchTermMarker, setSearchTermMarker, coordinates, setCoordinates, defaultCenter, handleRequestToRegister } = props;

  return (
    <div>
      <SearchClinicsByDoctorForm setCoordinates={setCoordinates} defaultCenter={defaultCenter}/>
      <SearchClinicsByAddressForm setCoordinates={setCoordinates} setSearchTermMarker={setSearchTermMarker}/>
      <MapComponent coordinates={coordinates} searchTermMarker={searchTermMarker}/>
      <ClinicsList searchCoordinates={coordinates} handleRequestToRegister={handleRequestToRegister}/> 
    </div>
  );
};

export default AvailableDoctors;

