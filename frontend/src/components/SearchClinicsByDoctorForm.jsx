import React, { useContext, useState, useEffect } from 'react';
import { calculateCenter } from '../helpers/calcCenter';
import { UserSignedIn } from '../App';
import { Button, Input } from '@mui/material';
import { Box } from '@mui/system';

const SearchClinicsByDoctorForm = ({ setCoordinates, defaultCenter, setDisplayedClinics, mapDoctors, mapClinics }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filterClinicsByDoctorName = (searchTerm) => {
    const filteredDoctors = mapDoctors.filter(doctor => doctor.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const clinicIds = [...new Set(filteredDoctors.map(doctor => doctor.clinic_id))];
    return mapClinics.filter(clinic => clinicIds.includes(clinic.id));
  };

  useEffect(() => {
    setDisplayedClinics(filterClinicsByDoctorName(searchTerm));
    const filteredClinicsCenter = calculateCenter(filterClinicsByDoctorName(searchTerm), defaultCenter);
    setCoordinates(filteredClinicsCenter);
  }, [searchTerm]);

  const handleCancel = () => {
    setDisplayedClinics(mapClinics);
  }

  return (
    <Box width="100%">
      <form width="100%">
        <Box className="flex justify-between">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter doctor's name"
            onClick={(e) => e.stopPropagation()}
            sx={{
              minWidth: "225px",
              marginRight: "24px"
            }}
          />
          <Button onClick={handleCancel} variant="small">Cancel</Button>
        </Box>
    </form>
    </Box>
  );
};

export default SearchClinicsByDoctorForm;
