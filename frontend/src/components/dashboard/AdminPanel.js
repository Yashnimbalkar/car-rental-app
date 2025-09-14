import React, { useState, useEffect } from 'react';
import { Container, Alert, Button, Table, Form, Modal } from 'react-bootstrap';
import api from '../../services/api';
import moment from 'moment';

const AdminPanel = () => {
  const [tab, setTab] = useState('cars'); // cars, users, bookings
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState({ make: '', model: '', year: '', pricePerDay: '', description: '', image: '' });

  // Fetch data based on tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const endpoint = tab === 'cars' ? '/admin/cars' : tab === 'users' ? '/admin/users' : '/admin/bookings';
        const response = await api.get(endpoint);
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || `Failed to fetch ${tab}`);
        setLoading(false);
      }
    };
    fetchData();
  }, [tab]);

  // Handle car creation
  const handleCreateCar = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/cars', newCar);
      setData([...data, response.data.data]);
      setShowModal(false);
      setNewCar({ make: '', model: '', year: '', pricePerDay: '', description: '', image: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create car');
    }
  };

  // Handle delete (cars/users/bookings)
  const handleDelete = async (id, type) => {
    if (!window.confirm(`Delete ${type}?`)) return;
    try {
      await api.delete(`/admin/${type}/${id}`);
      setData(data.filter(item => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || `Failed to delete ${type}`);
    }
  };

  // Handle booking status update
  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const response = await api.put(`/admin/bookings/${id}`, { status });
      setData(data.map(item => (item._id === id ? response.data.data : item)));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update booking');
    }
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-4">
      <h2>Admin Panel</h2>
      <Alert variant="warning">Admin only. Manage cars, users, bookings.</Alert>
      
      {/* Tabs */}
      <Button variant={tab === 'cars' ? 'primary' : 'secondary'} onClick={() => setTab('cars')} className="me-2">Cars</Button>
      <Button variant={tab === 'users' ? 'primary' : 'secondary'} onClick={() => setTab('users')} className="me-2">Users</Button>
      <Button variant={tab === 'bookings' ? 'primary' : 'secondary'} onClick={() => setTab('bookings')}>Bookings</Button>

      {/* Add Car Modal */}
      {tab === 'cars' && (
        <Button variant="success" onClick={() => setShowModal(true)} className="mt-3 mb-3">Add New Car</Button>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateCar}>
            <Form.Group className="mb-3">
              <Form.Label>Make</Form.Label>
              <Form.Control name="make" value={newCar.make} onChange={(e) => setNewCar({ ...newCar, make: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control name="model" value={newCar.model} onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control type="number" name="year" value={newCar.year} onChange={(e) => setNewCar({ ...newCar, year: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price/Day</Form.Label>
              <Form.Control type="number" name="pricePerDay" value={newCar.pricePerDay} onChange={(e) => setNewCar({ ...newCar, pricePerDay: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={newCar.description} onChange={(e) => setNewCar({ ...newCar, description: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="image" value={newCar.image} onChange={(e) => setNewCar({ ...newCar, image: e.target.value })} />
            </Form.Group>
            <Button variant="primary" type="submit">Add Car</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Data Table */}
      <Table striped bordered hover className="mt-3">
        <thead>
          {tab === 'cars' && (
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price/Day</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          )}
          {tab === 'users' && (
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          )}
          {tab === 'bookings' && (
            <tr>
              <th>Car</th>
              <th>User</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          )}
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {tab === 'cars' && (
                <>
                  <td>{item.make}</td>
                  <td>{item.model}</td>
                  <td>{item.year}</td>
                  <td>${item.pricePerDay}</td>
                  <td>{item.isAvailable ? 'Yes' : 'No'}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(item._id, 'cars')}>
                      Delete
                    </Button>
                  </td>
                </>
              )}
              {tab === 'users' && (
                <>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.role}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(item._id, 'users')}>
                      Delete
                    </Button>
                  </td>
                </>
              )}
              {tab === 'bookings' && (
                <>
                  <td>{item.car.make} {item.car.model}</td>
                  <td>{item.user.name}</td>
                  <td>{moment(item.startDate).format('MMM D, YYYY')}</td>
                  <td>{moment(item.endDate).format('MMM D, YYYY')}</td>
                  <td>
                    <Form.Select
                      value={item.status}
                      onChange={(e) => handleUpdateBookingStatus(item._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(item._id, 'bookings')}>
                      Delete
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPanel;