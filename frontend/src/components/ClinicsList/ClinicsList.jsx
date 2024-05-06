import { useEffect, useState } from "react";
import axios from 'axios';
import ClinicListItem from "./ClinicsListItem";
import { calcRoute } from "../../helpers/calcRoute";

const ClinicList = ({ searchCoordinates }) => {
  const [clinicsList, setClinicsList] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (searchCoordinates) {
      // Fetch clinics and doctors
      Promise.all([
        axios.get('http://localhost:8080/clinics'),
        axios.get('http://localhost:8080/doctors')
      ])
      .then(([clinicsResponse, doctorsResponse]) => {
        
        const clinicPromises = clinicsResponse.data.map(clinic => {
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

        // Set doctors
        setDoctors(doctorsResponse.data);

        // Wait for all distance calculations to complete
        return Promise.all(clinicPromises);
      })
      .then(clinicsWithDistances => {
        const sortedClinics = clinicsWithDistances.sort((a, b) => a.distance - b.distance);
        setClinicsList(sortedClinics);
      })
      .catch(error => {
        console.error('Error fetching clinics and doctors:', error);
      });
    }
  }, [searchCoordinates]);

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
