const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
});

module.exports = mongoose.model('Car', carSchema);