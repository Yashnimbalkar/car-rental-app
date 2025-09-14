const Booking = require('../models/Booking');
const Car = require('../models/Car');
const { protect } = require('../middleware/auth');

// Helper: Calculate days and total price
const calculateTotalPrice = (startDate, endDate, pricePerDay) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return days * pricePerDay;
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private (User)
const createBooking = async (req, res) => {
  try {
    const { car: carId, startDate, endDate } = req.body;
    const userId = req.user.id;

    // Find car and check availability
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    if (!car.isAvailable) {
      return res.status(400).json({ error: 'Car is not available' });
    }

    // Check for overlapping bookings (simple check: no pending/confirmed bookings in range)
    const overlap = await Booking.findOne({
      car: carId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate) } }
      ],
    });
    if (overlap) {
      return res.status(400).json({ error: 'Car is already booked for the selected dates' });
    }

    // Calculate total
    const totalPrice = calculateTotalPrice(startDate, endDate, car.pricePerDay);

    // Create booking
    const booking = await Booking.create({
      user: userId,
      car: carId,
      startDate,
      endDate,
      totalPrice,
    });

    // Update car availability (set to false for duration, but we'll handle in admin later)
    // For now, just create

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get user bookings (history)
// @route   GET /api/bookings
// @access  Private (User)
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, status } = req.query;

    const query = { user: userId };
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('car', 'make model year pricePerDay image')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private (User/Admin)
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('car', 'make model year pricePerDay image')
      .select('-__v');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if user owns it or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to view this booking' });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBooking,
};