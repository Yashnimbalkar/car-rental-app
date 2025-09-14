const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'Car make is required'],
    trim: true,
  },
  model: {
    type: String,
    required: [true, 'Car model is required'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'Car year is required'],
    min: [1886, 'Year must be valid'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future'],
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Price per day is required'],
    min: [0, 'Price cannot be negative'],
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String, // URL to car image (we'll use placeholders)
    default: 'https://via.placeholder.com/300x200?text=Car+Image',
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    default: 'Petrol',
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic'],
    default: 'Manual',
  },
  seats: {
    type: Number,
    min: [1, 'At least 1 seat'],
    default: 4,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;