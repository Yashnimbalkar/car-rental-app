const Car = require('../models/Car');
const Booking = require('../models/Booking');

// Get all cars
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Book a car
const bookCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const { startDate, endDate } = req.body;
    const userId = req.user._id; // From auth middleware

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    if (!car.availability) {
      return res.status(400).json({ message: 'Car is not available' });
    }

    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = days * car.pricePerDay;

    const booking = new Booking({
      userId,
      carId,
      startDate,
      endDate,
      totalPrice,
    });
    await booking.save();

    car.availability = false;
    await car.save();

    res.json({ message: 'Car booked successfully', bookingId: booking._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getCars, bookCar };