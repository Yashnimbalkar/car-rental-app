const express = require('express');
const { 
  getCars, 
  getCar, 
  createCar, 
  updateCar, 
  deleteCar 
} = require('../controllers/carController');
const { protect, authorize } = require('../middleware/auth');
const { validateCar, validatePartialCar, validateCarId } = require('../middleware/validation');

const router = express.Router();

router
  .route('/')
  .get(getCars)
  .post(protect, authorize('admin'), validateCar, createCar);

router
  .route('/:id')
  .get(validateCarId, getCar)
  .put(protect, authorize('admin'), validateCarId, validatePartialCar, updateCar)
  .delete(protect, authorize('admin'), validateCarId, deleteCar);

module.exports = router;