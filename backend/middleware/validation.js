const Joi = require('joi');

// Existing auth validations...
const signupSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 2 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
  phone: Joi.string().pattern(/^\d{10}$/).messages({
    'string.pattern.base': 'Please enter a valid 10-digit phone number',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
});

// Full car validation (for create)
const carSchema = Joi.object({
  make: Joi.string().max(50).required().messages({
    'string.base': 'Make must be a string',
    'any.required': 'Car make is required',
  }),
  model: Joi.string().max(50).required().messages({
    'string.base': 'Model must be a string',
    'any.required': 'Car model is required',
  }),
  year: Joi.number().integer().min(1886).max(2026).required().messages({
    'number.base': 'Year must be a number',
    'any.required': 'Car year is required',
  }),
  pricePerDay: Joi.number().min(0).required().messages({
    'number.base': 'Price per day must be a number',
    'any.required': 'Price per day is required',
  }),
  description: Joi.string().max(500).messages({
    'string.base': 'Description must be a string',
  }),
  image: Joi.string().uri().allow('').messages({
    'string.uri': 'Image must be a valid URL',
  }),
  fuelType: Joi.string().valid('Petrol', 'Diesel', 'Electric', 'Hybrid').messages({
    'any.only': 'Invalid fuel type',
  }),
  transmission: Joi.string().valid('Manual', 'Automatic').messages({
    'any.only': 'Invalid transmission type',
  }),
  seats: Joi.number().integer().min(1).max(20).messages({
    'number.base': 'Seats must be a number',
  }),
  isAvailable: Joi.boolean().messages({
    'boolean.base': 'isAvailable must be true or false',
  }),
});

// Partial car validation (for update - fields optional)
const partialCarSchema = Joi.object({
  make: Joi.string().max(50).optional().messages({
    'string.base': 'Make must be a string',
  }),
  model: Joi.string().max(50).optional().messages({
    'string.base': 'Model must be a string',
  }),
  year: Joi.number().integer().min(1886).max(2026).optional().messages({
    'number.base': 'Year must be a number',
  }),
  pricePerDay: Joi.number().min(0).optional().messages({
    'number.base': 'Price per day must be a number',
  }),
  description: Joi.string().max(500).optional().messages({
    'string.base': 'Description must be a string',
  }),
  image: Joi.string().uri().allow('').optional().messages({
    'string.uri': 'Image must be a valid URL',
  }),
  fuelType: Joi.string().valid('Petrol', 'Diesel', 'Electric', 'Hybrid').optional().messages({
    'any.only': 'Invalid fuel type',
  }),
  transmission: Joi.string().valid('Manual', 'Automatic').optional().messages({
    'any.only': 'Invalid transmission type',
  }),
  seats: Joi.number().integer().min(1).max(20).optional().messages({
    'number.base': 'Seats must be a number',
  }),
  isAvailable: Joi.boolean().optional().messages({
    'boolean.base': 'isAvailable must be true or false',
  }),
});

// Booking validation (for create)
const bookingSchema = Joi.object({
  car: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Invalid car ID',
    'any.required': 'Car ID is required',
  }),
  startDate: Joi.date().iso().greater('now').required().messages({
    'date.base': 'Start date must be a valid date',
    'any.required': 'Start date is required',
  }),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().messages({
    'date.base': 'End date must be a valid date',
    'any.required': 'End date is required',
    'date.greater': 'End date must be after start date',
  }),
});

// User ID validation (for params)
const userIdSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Invalid user ID format',
  }),
});

// Car ID validation (for params)
const idSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Invalid car ID format',
  }),
});

const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateCar = (req, res, next) => {
  const { error } = carSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validatePartialCar = (req, res, next) => {
  const { error } = partialCarSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateCarId = (req, res, next) => {
  const { error } = idSchema.validate({ id: req.params.id });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateUserId = (req, res, next) => {
  const { error } = userIdSchema.validate({ id: req.params.id });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { 
  validateSignup, 
  validateLogin, 
  validateCar, 
  validatePartialCar,
  validateBooking,
  validateCarId,
  validateUserId
};