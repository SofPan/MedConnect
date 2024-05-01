// Function to geocode an address
require('dotenv').config();
const axios = require('axios');

const geocodeAddress = (address) => {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`)
    .then(response => {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    })
    .catch(error => {
      console.error('Error geocoding address:', error);
      return null;
    });
};

module.exports = { geocodeAddress };
