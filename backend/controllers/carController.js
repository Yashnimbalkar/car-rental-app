const Car = require('../models/Car');
const { protect } = require('../middleware/auth');

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
const getCars = async (req, res) => {
  try {
    const { page = 1, limit = 10, make, fuelType } = req.query;
    const query = {};
    if (make) query.make = { $regex: make, $options: 'i' };
    if (fuelType) query.fuelType = fuelType;

    const cars = await Car.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v'); // Exclude Mongoose version

    const total = await Car.countDocuments(query);

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

// @desc    Get single car
// @route   GET /api/cars/:id
// @access  Public
const getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).select('-__v');

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create new car
// @route   POST /api/cars
// @access  Private (Admin)
const createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update car
// @route   PUT /api/cars/:id
// @access  Private (Admin)
const updateCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // Check if updating availability (for bookings later)
    if (req.body.isAvailable !== undefined) {
      car.isAvailable = req.body.isAvailable;
    }

    car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-__v');

    res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private (Admin)
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    await Car.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
};