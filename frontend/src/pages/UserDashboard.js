import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import UserProfile from '../components/dashboard/UserProfile';
import BookingHistory from '../components/dashboard/BookingHistory';

const UserDashboard = () => {
  return (
    <Container className="py-4">
      <h2>User Dashboard</h2>
      <Alert variant="info">Welcome! Manage your profile and bookings here.</Alert>
      <UserProfile />
      <hr />
      <BookingHistory />
    </Container>
  );
};

export default UserDashboard;