import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import axios from 'axios';
import { Table, Form } from 'react-bootstrap';

const CarList = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(100);
  const [error, setError] = useState('');

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
                  <button
                    className="btn btn-primary"
                    disabled={!car.availability}
                  >
                    Book
                  </button>
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