import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const BookingConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const foundBooking = response.data.find((b) => b._id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        } else {
          setError('Booking not found');
        }
      } catch (err) {
        setError('Failed to fetch booking');
      }
    };
    fetchBooking();
  }, [id]);

  if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  if (!booking) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Booking Confirmation</h2>
      <Card>
        <Card.Body>
          <Card.Title>Booking #{booking._id}</Card.Title>
          <Card.Text>Car: {booking.carId.name} {booking.carId.model}</Card.Text>
          <Card.Text>Start Date: {new Date(booking.startDate).toLocaleDateString()}</Card.Text>
          <Card.Text>End Date: {new Date(booking.endDate).toLocaleDateString()}</Card.Text>
          <Card.Text>Total Price: ${booking.totalPrice}</Card.Text>
          <Button variant="primary" onClick={() => navigate('/cars')}>
            Back to Cars
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookingConfirmation;