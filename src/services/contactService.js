// contactService.js

const Contact = require('../models/Contact');
const PhoneNumber = require('../models/PhoneNumber');

// Create a new contact
exports.createContact = async (name, emails, phoneNumbers) => {
  // Check if contact with same name already exists
  let existingContact = await Contact.findOne({ name });
  if (existingContact) {
    throw new Error('Contact with this name already exists');
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

  return savedContact;
};

// Delete contact by ID
exports.deleteContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new Error('Contact not found');
  }
  await contact.remove();
};

// Fetch all contacts
exports.getAllContacts = async () => {
  return await Contact.find().populate('phoneNumbers', 'number');
};

// Search contacts by name or phone number
exports.searchContacts = async (searchTerm) => {
  return await Contact.find({
    $or: [{ name: { $regex: searchTerm, $options: 'i' } }, { emails: searchTerm }],
  }).populate('phoneNumbers', 'number');
};

// Update contact by ID
exports.updateContactById = async (contactId, name, emails, phoneNumbers) => {
  let contact = await Contact.findById(contactId);
  if (!contact) {
    throw new Error('Contact not found');
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

  return contact;
};
