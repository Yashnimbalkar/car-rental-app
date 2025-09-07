const express = require('express');
const router = express.Router();
const { getCars, bookCar } = require('../controllers/carController');
const auth = require('../middleware/auth');

router.get('/', getCars);
router.put('/book/:carId', auth, bookCar);

module.exports = router;