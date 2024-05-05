// GET login page /login

// GET User Login /login/:id

// POST logout /logout
const { getCalendarByClinicId } = require('../src/db/queries/calendar/getCalendarByClinicId');


const express = require('express');
const router = express.Router();



router.get('/:id', (req, res) => {
  req.session.clinic_id = req.params.id;
  const clinicId = req.session.clinic_id;
  getCalendarByClinicId(clinicId)
      .then(calendar => {
        if (!calendar) {
            // If no calendar is found for the given clinic ID, return a 404 response
            return res.status(404).json({ error: 'Calendar not found' });
          }
          
          // If calendar is found, return it as JSON response
          res.send(calendar);
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
});




module.exports = router;


