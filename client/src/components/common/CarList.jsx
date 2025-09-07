import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CarList = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(100);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars`);
        setCars(response.data);
      } catch (err) {
        setError('Failed to fetch cars');
      }
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = car.pricePerDay <= maxPrice;
    return matchesSearch && matchesPrice;
  });

  const handleBook = async (carId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const startDate = new Date().toISOString().split('T')[0]; // Today
      const endDate = new Date(Date.now() + 86400000).toISOString().split('T')[0]; // Tomorrow
      await axios.put(
        `${import.meta.env.VITE_API_URL}/cars/book/${carId}`,
        { startDate, endDate },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate(`/booking/${carId}`); // Placeholder until booking ID is returned
    } catch (err) {
      setError('Booking failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Available Cars</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2"
        />
        <Form.Control
          type="range"
          min="0"
          max="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <p>Max Price: ${maxPrice}</p>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price/Day ($)</th>
            <th>Availability</th>
            {user && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredCars.map((car) => (
            <tr key={car._id}>
              <td>{car.name}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.pricePerDay}</td>
              <td>{car.availability ? 'Yes' : 'No'}</td>
              {user && (
                <td>
                  <Button
                    className="btn btn-primary"
                    disabled={!car.availability}
                    onClick={() => handleBook(car._id)}
                  >
                    Book
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CarList;