const express = require('express');
const router = express.Router();
const { getUserBookings } = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.get('/my-bookings', auth, getUserBookings);

module.exports = router;