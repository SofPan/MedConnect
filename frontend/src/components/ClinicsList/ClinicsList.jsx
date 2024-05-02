import { useEffect, useState } from "react";
import axios from 'axios';

import ClinicListItem from "./ClinicsListItem";

const ClinicList = ({ searchCoordinates }) => {
  const [clinicsList, setClinicsList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/clinics')
      .then(response => {
        // Sort clinics based on proximity to searchCoordinates
        const sortedClinics = response.data.sort((clinicA, clinicB) => {
          const distanceA = calculateDistance(searchCoordinates, clinicA.location);
          const distanceB = calculateDistance(searchCoordinates, clinicB.location);
          return distanceA - distanceB;
        });
        setClinicsList(sortedClinics);
      })
      .catch(error => console.error('Error fetching clinicsList', error));
  }, [searchCoordinates]);

  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = coord1.lat;
    const lon1 = coord1.lng;
    const lat2 = coord2.lat;
    const lon2 = coord2.lng;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const mapClinics = clinicsList.map(clinic => {
    return (
      <ClinicListItem 
        key={clinic.id} 
        id={clinic.id}
        name={clinic.name}
        address={clinic.address}
      />
    );
  });

  return (
    <ul className="available-clinics">
      {mapClinics}
    </ul>
  );
};

export default ClinicList;
