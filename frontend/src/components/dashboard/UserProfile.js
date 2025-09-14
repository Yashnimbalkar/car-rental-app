import React, { useContext, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext); // Get real user from context
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user ? { name: user.name, email: user.email, phone: user.phone } : {});
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.put('/users/profile', formData);
      // Update context (simplified; real app would refetch)
      alert('Profile updated!'); // Placeholder success
      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Update failed');
    }
  };

  if (!user) {
    return <Alert variant="warning">Loading profile...</Alert>;
  }

  return (
    <Card className="mb-3">
      <Card.Header>Profile</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {!editMode ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <Button variant="outline-primary" onClick={() => setEditMode(true)}>Update Profile</Button>
          </>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Save</Button>
            <Button variant="secondary" onClick={() => setEditMode(false)} className="ms-2">Cancel</Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserProfile;