// utils/validator.js

const { validationResult } = require('express-validator');

// Validate request using express-validator
exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
