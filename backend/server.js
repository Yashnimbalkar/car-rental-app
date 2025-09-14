require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Import models (for reference)
const User = require('./models/User');
const Car = require('./models/Car');
const Booking = require('./models/Booking');

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Car Rental Backend API is running!' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));

// Global Error Handler (production-ready)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// user: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzU3MGU0NmU0Zjg1MWQ4ZTQwMmMxNyIsImlhdCI6MTc1Nzc3NjMwNywiZXhwIjoxNzYwMzY4MzA3fQ.x3TJV38aPZozztT79rAo_8G0cz3uBz69ut7GPpqUelg

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzY1MzI1N2ViNjYzZjQ0ZDFlMjA5NiIsImlhdCI6MTc1NzgyNzg3OCwiZXhwIjoxNzYwNDE5ODc4fQ.jK2i395qBcIHJI55m5YTXDjn-A0VCcA7Mf4wBwWcWhE

// admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzY1M2Y1OTliOGM4OTM0MDhhYmI3NiIsImlhdCI6MTc1NzgzMDE3MywiZXhwIjoxNzYwNDIyMTczfQ.ATA8yMCFyAPEPQ6vcWk6qfwgyfkpEE88uVs_bDcK6G8

// 1: 68c57abb8f5f97fff059b617
// 2: 68c5813d8f5f97fff059b61a
// 3: 68c581728f5f97fff059b61d