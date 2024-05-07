// GET Display all of a clinic's appointments /appointments 

// POST create new appointment /appointments

// GET one appointment /appointment/:id

// PUT edit appointment /appointment/:id
/*
  Intended to be used on Patient side
  when booking or cancelling appointment
  So that it re-opens on clinic side
  if cancelled
*/

// DELETE delete appointment /appointment/:id/delete
// Used only on clinic side to delete appointment slot entirely
const express = require('express');
const router  = express.Router();

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
          res.json(calendar);
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
});


module.exports = router;