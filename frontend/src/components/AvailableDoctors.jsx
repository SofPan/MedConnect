import ClinicsList from './ClinicsList/ClinicsList';
import SearchClinicsByAddressForm from './SearchClinicsByAddressForm';
import MapComponent from './MapComponent';
import SearchClinicsByDoctorForm from './SearchClinicsByDoctorForm';


const AvailableDoctors = (props) => {
  const { searchTermMarker, setSearchTermMarker, clinics, doctors, coordinates, setCoordinates, displayedClinics, setDisplayedClinics, defaultCenter, handleRequestToRegister } = props;

  return (
    <div>
      <SearchClinicsByDoctorForm clinics={clinics} doctors={doctors} setDisplayedClinics={setDisplayedClinics} setCoordinates={setCoordinates} defaultCenter={defaultCenter}/>
      <SearchClinicsByAddressForm setCoordinates={setCoordinates} setSearchTermMarker={setSearchTermMarker}/>
      {/* <MapComponent clinics={displayedClinics} coordinates={coordinates} searchTermMarker={searchTermMarker}/> */}
      <ClinicsList clinics={displayedClinics} doctors={doctors} searchCoordinates={coordinates} handleRequestToRegister={handleRequestToRegister}/>
    </div>
  );
};

export default AvailableDoctors;

