
const express = require('express');
const { getAllClinics } = require('../src/db/queries/clinics/getAllClinics');
const { geocodeAddress } = require('../helpers/geocodeAdress');
const { addClinic } = require('../src/db/queries/clinics/addClinic');
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

  router.get('/:id', (req, res) => {

    req.session.user_id = req.params.id;
    const userId = req.session.user_id;

    getClinicIdbyUserID(userId)
      .then(clinic => {
        res.json(clinic);
      })
      .catch(error => {
        console.error('Error fetching clinics:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  router.get('/clinicName/:name', (req, res) => {
  
    const name = decodeURIComponent(req.params.name);

    getClinicIdbyName(name)
      .then(clinic => {
        res.json(clinic);
      })
      .catch(error => {
        console.error('Error fetching clinics:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });



  router.post('/', (req, res) => {
    const clinicData = {
      name: req.body.clinic_name,
      user_id: req.body.user_id,
      address: req.body.address
    };

    addClinic(clinicData)
      .then(clinic => {
        console.log(clinic)
        res.json(clinic);
      })
      .catch(error => {
        console.error('Error adding clinic:', error);
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