import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input } from '@mui/material';

const SearchClinicsByAddressForm = ({setCoordinates, setSearchTermMarker}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchByAddress = (e) => {
    e.preventDefault();
  
    axios.get(`clinics/api/geocode?address=${searchTerm}`)
      .then(response => {
        const { latitude, longitude } = response.data;
        setCoordinates({ lat: latitude, lng: longitude });
        setSearchTermMarker(true);
      })
      .catch(error => {
        console.error('Error geocoding address:', error);
      });
  };
  
  return (
    <form onSubmit={handleSearchByAddress}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter your zip code or address" 
      />
      <Button type='submit'>Search</Button>
    </form>
  );
};

export default SearchClinicsByAddressForm;
