import React, { useState, useEffect, useContext } from 'react';
import { Card, ListGroup, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import moment from 'moment';

const BookingHistory = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setError('Please log in to view bookings');
        setLoading(false);
        return;
      }
      try {
        const response = await api.get('/bookings');
        setBookings(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch bookings');
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  if (loading) return <Card>Loading...</Card>;
  if (error) return <Card><Alert variant="danger">{error}</Alert></Card>;

  return (
    <Card>
      <Card.Header>Booking History</Card.Header>
      <Card.Body>
        <ListGroup>
          {bookings.length === 0 ? (
            <ListGroup.Item>No bookings yet. Book a car!</ListGroup.Item>
          ) : (
            bookings.map((booking) => (
              <ListGroup.Item key={booking._id}>
                <strong>{booking.car.make} {booking.car.model}</strong> - 
                From: {moment(booking.startDate).format('MMM D, YYYY')} to 
                {moment(booking.endDate).format('MMM D, YYYY')} - 
                Status: {booking.status}
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default BookingHistory;