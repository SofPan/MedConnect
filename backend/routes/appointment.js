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



module.exports = router;