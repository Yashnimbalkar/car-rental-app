const express = require('express');
const { getProfile, updateProfile, getBookingHistory } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Profile routes
router
  .route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

// History route
router.route('/history').get(protect, getBookingHistory);

module.exports = router;