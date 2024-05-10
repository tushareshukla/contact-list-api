// contactRoutes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createContact,
  deleteContact,
  getAllContacts,
  searchContacts,
  updateContact,
} = require('../controllers/contactController');
const { uploadImage } = require('../controllers/uploadController');
const { exportContacts } = require('../controllers/csvController');

// POST /contacts - Create a new contact
router.post(
  '/contacts',
  [
    body('name', 'Name is required').notEmpty(),
    body('emails', 'Emails must be an array').isArray(),
    body('emails.*', 'Invalid email format').isEmail(),
    // You can add more validation rules here
  ],
  createContact
);

// DELETE /contacts/:id - Delete a contact by ID
router.delete('/contacts/:id', deleteContact);

// GET /contacts - Fetch all contacts
router.get('/contacts', getAllContacts);

// GET /contacts/search - Search contacts by name or phone number
router.get('/contacts/search', searchContacts);

// PUT /contacts/:id - Update a contact by ID
router.put('/contacts/:id', updateContact);

// POST /contacts/upload-image - Upload image for a contact
router.post('/contacts/upload-image', uploadImage);

// GET /contacts/export-csv - Export all contacts to CSV
router.get('/contacts/export-csv', exportContacts);

module.exports = router;
