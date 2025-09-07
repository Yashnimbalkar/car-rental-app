const Booking = require('../models/Booking');
const Car = require('../models/Car');

// Get bookings by user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate('carId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getUserBookings };