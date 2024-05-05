
const express = require('express');
const { getAllClinics } = require('../src/db/queries/clinics/getAllClinics');
const { geocodeAddress } = require('../helpers/geocodeAdress');
const router  = express.Router();

// Route to fetch clinics with geocoded addresses
  router.get('/', (req, res) => {
    getAllClinics()
      .then(clinics => {
        res.json(clinics);
      })
      .catch(error => {
        console.error('Error fetching clinics:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

// Route to handle geocoding of addresses
router.get('/api/geocode', (req, res) => {
  const address = req.query.address;
  
  geocodeAddress(address)
    .then(location => {
      if (location) {
        res.json({ latitude: location.lat, longitude: location.lng });
      } else {
        res.status(500).json({ error: 'Error geocoding address' });
      }
    })
    .catch(error => {
      console.error('Error geocoding address:', error);
      res.status(500).json({ error: 'Error geocoding address' });
    });
});

module.exports = router;