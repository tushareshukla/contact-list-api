// PhoneNumber.js

const mongoose = require('mongoose');

const phoneNumberSchema = new mongoose.Schema({
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema);

module.exports = PhoneNumber;
