const express = require('express');
const { 
  getUsers, 
  deleteUser, 
  getBookings, 
  updateBookingStatus, 
  deleteBooking,
  getAdminCars 
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');
const { validateUserId, validateCarId } = require('../middleware/validation'); // Reuse for IDs

const router = express.Router();

// Protect all admin routes
router.use(protect, authorize('admin'));

// Users
router
  .route('/users')
  .get(getUsers);

router
  .route('/users/:id')
  .delete(validateUserId, deleteUser);

// Bookings
router
  .route('/bookings')
  .get(getBookings);

router
  .route('/bookings/:id')
  .put(validateCarId, updateBookingStatus) // Reuse validateCarId for booking ID
  .delete(validateCarId, deleteBooking);

// Cars (admin view)
router
  .route('/cars')
  .get(getAdminCars);

module.exports = router;