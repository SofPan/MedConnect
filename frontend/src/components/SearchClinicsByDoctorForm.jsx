import React, { useEffect, useState } from 'react';
import { calculateCenter } from '../helpers/calcCenter';

const SearchClinicsByDoctorForm = ({clinics, doctors, setDisplayedClinics, setCoordinates, defaultCenter}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) {
      const filteredClinics = clinics.filter(clinic => {
        const doctor = doctors.find(doc => doc.clinic_id === clinic.id);
        return doctor && doctor.name.toLowerCase().includes(searchTerm);
      });
      setDisplayedClinics(filteredClinics);
      // Calculate the center of filtered clinics
      const filteredClinicsCenter = calculateCenter(filteredClinics, defaultCenter);
      setCoordinates(filteredClinicsCenter);
    } else {
      setDisplayedClinics(clinics);
      setCoordinates(defaultCenter);
    }
  }, [searchTerm]);

  return (
    <form>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter doctor's name"
      />
   </form>
  );
};

export default SearchClinicsByDoctorForm;
