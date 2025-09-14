const express = require('express');
const { createBooking, getUserBookings, getBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { validateBooking, validateCarId } = require('../middleware/validation');

const router = express.Router();

router
  .route('/')
  .post(protect, validateBooking, createBooking)
  .get(protect, getUserBookings);

router
  .route('/:id')
  .get(protect, validateCarId, getBooking);

module.exports = router;