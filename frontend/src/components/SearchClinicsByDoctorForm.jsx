import React, { useContext, useEffect, useState } from 'react';
import { calculateCenter } from '../helpers/calcCenter';
import { UserSignedIn } from '../App';

const SearchClinicsByDoctorForm = ({setDisplayedClinics, setCoordinates, defaultCenter}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { userState } = useContext(UserSignedIn);
  console.log(userState)


  const handleSearchByName = (e) => {
      e.preventDefault();
      if (searchTerm) {
      const filteredClinics = userState.clinics.filter(clinic => {
        const doctor = userState.doctors.find(doc => doc.clinic_id === clinic.id);
        return doctor && doctor.name.toLowerCase().includes(searchTerm);
      });
      setDisplayedClinics(filteredClinics);
      // Calculate the center of filtered clinics
      const filteredClinicsCenter = calculateCenter(filteredClinics, defaultCenter);
      setCoordinates(filteredClinicsCenter);
    } else {
      setDisplayedClinics(userState.clinics);
      setCoordinates(defaultCenter);
    }
  }

  return (
    <form onSubmit={handleSearchByName}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter doctor's name"
      />
      <button type='submit'>Search</button>
   </form>
  );
};

export default SearchClinicsByDoctorForm;
