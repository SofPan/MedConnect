import { useEffect, useState } from "react";
import axios from 'axios';
import ClinicListItem from "./ClinicsListItem";

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

  const calcRoute = async (coords, clinicLocation) => {
    try {
      const directionService = new window.google.maps.DirectionsService();
      const results = await directionService.route({
        origin: coords,
        destination: clinicLocation,
        travelMode: window.google.maps.TravelMode.DRIVING
      });
      return results.routes[0].legs[0].distance.value;
    } catch (error) {
      console.error('Error calculating route:', error);
      return Infinity; // Return a large value to put this clinic at the end of the sorted list
    }
  };

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
