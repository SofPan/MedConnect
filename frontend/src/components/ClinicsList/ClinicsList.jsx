import { useEffect, useState } from "react";
import ClinicListItem from "./ClinicsListItem";
import { calcRoute } from "../../helpers/calcRoute";

const ClinicList = ({ searchCoordinates, clinics, doctors }) => {
  const [clinicsList, setClinicsList] = useState([]);
  console.log(clinics)
  console.log(doctors)

  useEffect(() => {
    if (searchCoordinates && clinics && doctors) {
      const clinicPromises = clinics.map(clinic => {
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
  }, [searchCoordinates, clinics, doctors]);

  const mapClinics = clinicsList.map(clinic => (
    <ClinicListItem 
      key={clinic.id} 
      id={clinic.id}
      name={clinic.name}
      address={clinic.address}
      distance={clinic.distance}
      doctors={doctors} 
    />
  ));
  return (
    <ul className="available-clinics">
      {mapClinics}
    </ul>
  );
};

export default ClinicList;
