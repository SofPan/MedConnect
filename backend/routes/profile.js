const express = require('express');
const router = express.Router();
const { getUserById } = require('../src/db/queries/users/getUserById');
const { getClinicByUserId } = require('../src/db/queries/clinics/getClinicByUserId')
// GET Patient or Clinic profile /profile/:id
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  getUserById(userId)
    .then(userData => {
      if (userData.is_clinic) {
        getClinicByUserId(userId)
          .then(clinicData => res.json(clinicData));
      }
    })
    .catch(error => console.error("user profile error", error));

})

// POST Edit Patient or Clinic profile /profile/:id



module.exports = router;