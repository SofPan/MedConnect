import { useContext, useEffect, useState } from "react";
import ClinicListItem from "./ClinicsListItem";
import { calcRoute } from "../../helpers/calcRoute";
import { UserSignedIn } from "../../App";

const ClinicList = ({ searchCoordinates, handleRequestToRegister }) => {
  const { userState } = useContext(UserSignedIn);
  const [clinicsList, setClinicsList] = useState([]);

  useEffect(() => {
    if (searchCoordinates && userState.displayedClinics) {
      const clinicPromises = userState.displayedClinics.map(clinic => {
        const location = {
          lat: parseFloat(clinic.latitude),
          lng: parseFloat(clinic.longitude),
        } 
        return calcRoute(searchCoordinates, location)
          .then(distance => ({ ...clinic, distance }))
          .catch(error => {
            console.error('Error calculating distance:', error);
          });
      });

      // Wait for all distance calculations to complete
      Promise.all(clinicPromises)
        .then(clinicsWithDistances => {
          const sortedClinics = clinicsWithDistances.sort((a, b) => a.distance - b.distance);
          setClinicsList(sortedClinics);
        })
        .catch(error => {
          console.error('Error calculating distances:', error);
        });
    }
  }, [searchCoordinates, userState.displayedClinics]);

  const mapClinics = clinicsList.map(clinic => (
    <ClinicListItem 
      key={clinic.id} 
      id={clinic.id}
      name={clinic.name}
      address={clinic.address}
      distance={clinic.distance}
      handleRequestToRegister={handleRequestToRegister}
    />
  ));
  return (
    <ul className="available-clinics">
      {mapClinics}
    </ul>
  );
};

export default ClinicList;
