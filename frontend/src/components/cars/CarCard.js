import React, { useState, useContext } from 'react';
import { Card, Button, Col, Form, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import moment from 'moment';

const CarCard = ({ car }) => {
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please log in to book a car');
      return;
    }
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }
    try {
      const response = await api.post('/bookings', {
        car: car._id,
        startDate,
        endDate,
      });
      setSuccess('Booking created successfully!');
      setError('');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
      setSuccess('');
    }
  };

  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Img variant="top" src={car.image || 'https://via.placeholder.com/200'} height="200" />
        <Card.Body>
          <Card.Title>{car.make} {car.model} ({car.year})</Card.Title>
          <Card.Text>{car.description || 'No description available'}</Card.Text>
          <Card.Text><strong>${car.pricePerDay}/day</strong></Card.Text>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          {car.isAvailable ? (
            <Form onSubmit={handleBooking}>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={moment().format('YYYY-MM-DD')}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || moment().format('YYYY-MM-DD')}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">Book Now</Button>
            </Form>
          ) : (
            <Alert variant="warning">Car not available</Alert>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CarCard;