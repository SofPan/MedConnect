const express = require('express');
const router = express.Router();
const { getAllDocuments } = require('../src/db/queries/documents/getAllDocuments');
const { deleteDocument } = require('../src/db/queries/documents/deleteDocument');
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
// POST create a new document /document

// GET display a single document /document/:id 

// DELETE delete a document /document/:id/delete
router.delete('/:id/delete', (req, res) => {
  deleteDocument(req.params.id).then(result => {
    return result;
  })
    .catch(error => {
      res
        .status(500)
        .json({ error: error.message });
    });
})

module.exports = router;