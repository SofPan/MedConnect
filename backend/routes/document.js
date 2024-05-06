const express = require('express');
const router = express.Router();
// GET all documents /documents
router.get('/', (req, res) => {
  getAllDocuments()
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error('Error fetching documents:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});
// Filter by patient ID for logged in patient

// POST create a new document /document

// GET display a single document /document/:id 

// DELETE delete a document /document/:id/delete


module.exports = router;