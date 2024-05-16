import { useContext, useEffect, useState } from "react";
import ClinicListItem from "./ClinicsListItem";
import { calcRoute } from "../../helpers/calcRoute";
import { UserSignedIn } from "../../App";
import BasicModal from "../GeneralComponents/BasicModal";

const ClinicList = ({ searchCoordinates, handleRequestToRegister, clinics }) => {
  const [clinicsList, setClinicsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('Please, login or sign up as a patient');

  useEffect(() => {
    if (searchCoordinates && clinics) {
        const clinicDistances = clinics.map((clinic) => {
            const location = {
                lat: parseFloat(clinic.latitude),
                lng: parseFloat(clinic.longitude),
            };
            const distance = calcRoute(searchCoordinates, location);
            return { ...clinic, distance };
        });

        const sortedClinics = clinicDistances.sort((a, b) => a.distance - b.distance);
        setClinicsList(sortedClinics);
      }
}, [searchCoordinates, clinics]);


  const mapClinics = clinicsList.map(clinic => (
    <ClinicListItem 
      key={clinic.id} 
      id={clinic.id}
      name={clinic.name}
      address={clinic.address}
      distance={clinic.distance}
      handleRequestToRegister={handleRequestToRegister}
      setErrorMessage={setErrorMessage}
    />
  ));
  return (
    <div>
      <BasicModal title="Error" message={errorMessage}/>
      <ul className="available-clinics">
        {mapClinics}
     </ul>
    </div>
  );
};

export default ClinicList;
