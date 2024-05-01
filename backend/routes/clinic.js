
const express = require('express');
const { getAllClinics } = require('../src/db/queries/clinics/getAllClinics');
const { geocodeAddress } = require('../helpers/geocodeAdress');
const router  = express.Router();

// Route to fetch clinics with geocoded addresses
  router.get('/', (req, res) => {
    getAllClinics()
      .then(clinicData => {
        return Promise.all(clinicData.map(clinic => {
          return geocodeAddress(clinic.address)
            .then(location => {
              return { ...clinic, location };
            });
        }));
      })
      .then(clinicsWithGeocoding => {
        console.log(clinicsWithGeocoding);
        res.json(clinicsWithGeocoding);
      })
      .catch(error => {
        console.error('Error fetching clinics:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

// Route to handle geocoding of addresses
router.get('/api/geocode', async (req, res) => {
  const address = req.query.address;
  try {
    const location = await geocodeAddress(address);
    if (location) {
      res.json({ latitude: location.lat, longitude: location.lng });
    } else {
      res.status(500).json({ error: 'Error geocoding address' });
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
    res.status(500).json({ error: 'Error geocoding address' });
  }
});

module.exports = router;