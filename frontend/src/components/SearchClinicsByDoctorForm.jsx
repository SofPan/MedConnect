import React, { useContext, useState } from 'react';
import { calculateCenter } from '../helpers/calcCenter';
import { UserSignedIn } from '../App';
import { Button, Input } from '@mui/material';

const SearchClinicsByDoctorForm = ({setCoordinates, defaultCenter, setMapClinics}) => {
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
      
      setMapClinics(filteredClinics);

      // Calculate the center of filtered clinics
      const filteredClinicsCenter = calculateCenter(filteredClinics, defaultCenter);
      setCoordinates(filteredClinicsCenter);
    } else {
      setMapClinics(userState.clinics);
      setCoordinates(defaultCenter);
    }
  }

  return (
    <form onSubmit={handleSearchByName}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter doctor's name"
      />
      <Button type='submit'>Search</Button>
   </form>
  );
};

export default SearchClinicsByDoctorForm;
