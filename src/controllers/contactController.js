// contactController.js

const Contact = require('../models/Contact');
const PhoneNumber = require('../models/PhoneNumber');
const { validationResult } = require('express-validator');

// Create new contact
exports.createContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, emails, phoneNumbers } = req.body;

    // Check if contact with same name already exists
    let existingContact = await Contact.findOne({ name });
    if (existingContact) {
      return res.status(400).json({ msg: 'Contact with this name already exists' });
    }

    // Create new contact
    const newContact = new Contact({
      name,
      emails,
    });

    // Save contact
    const savedContact = await newContact.save();

    // Save phone numbers
    if (phoneNumbers && phoneNumbers.length > 0) {
      await Promise.all(
        phoneNumbers.map(async (phoneNumber) => {
          const newPhoneNumber = new PhoneNumber({
            contact: savedContact._id,
            number: phoneNumber,
          });
          await newPhoneNumber.save();
        })
      );
    }

    res.json(savedContact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete contact by ID
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    await contact.remove();

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Fetch all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().populate('phoneNumbers', 'number');

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Search contacts by name or phone number
exports.searchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    const contacts = await Contact.find({
      $or: [{ name: { $regex: searchTerm, $options: 'i' } }, { emails: searchTerm }],
    }).populate('phoneNumbers', 'number');

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update contact by ID
exports.updateContact = async (req, res) => {
  try {
    const { name, emails, phoneNumbers } = req.body;

    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    // Update contact
    contact.name = name;
    contact.emails = emails;

    await contact.save();

    // Update phone numbers
    await PhoneNumber.deleteMany({ contact: contact._id });

    if (phoneNumbers && phoneNumbers.length > 0) {
      await Promise.all(
        phoneNumbers.map(async (phoneNumber) => {
          const newPhoneNumber = new PhoneNumber({
            contact: contact._id,
            number: phoneNumber,
          });
          await newPhoneNumber.save();
        })
      );
    }

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
