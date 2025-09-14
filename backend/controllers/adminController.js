const User = require('../models/User');
const Car = require('../models/Car');
const Booking = require('../models/Booking');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private (Admin)
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments({});

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete user (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent deleting self
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    // Delete associated bookings
    await Booking.deleteMany({ user: req.params.id });

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all bookings (admin only)
// @route   GET /api/admin/bookings
// @access  Private (Admin)
const getBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = {};
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('user', 'name email')
      .populate('car', 'make model year')
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

// @desc    Update booking status (admin only)
// @route   PUT /api/admin/bookings/:id
// @access  Private (Admin)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id)
      .populate('car', 'isAvailable');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // If cancelling, make car available
    if (status === 'cancelled' && booking.car) {
      await Car.findByIdAndUpdate(booking.car._id, { isAvailable: true });
    }

    // If confirming, set car unavailable (simple; real app would check overlaps)
    if (status === 'confirmed' && booking.car) {
      await Car.findByIdAndUpdate(booking.car._id, { isAvailable: false });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete booking (admin only)
// @route   DELETE /api/admin/bookings/:id
// @access  Private (Admin)
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Make car available on delete
    await Car.findByIdAndUpdate(booking.car, { isAvailable: true });

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all cars (admin view - same as public but full)
// @route   GET /api/admin/cars
// @access  Private (Admin)
const getAdminCars = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const cars = await Car.find({})
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Car.countDocuments({});

    res.status(200).json({
      success: true,
      count: cars.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: cars,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  getBookings,
  updateBookingStatus,
  deleteBooking,
  getAdminCars,
};