// import React, { useState, useEffect } from 'react';
// import { Container, Row, Alert } from 'react-bootstrap';
// import CarCard from './CarCard';
// import api from '../../services/api';

// const CarList = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await api.get('/cars');
//         setCars(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.error || 'Failed to fetch cars');
//         setLoading(false);
//       }
//     };
//     fetchCars();
//   }, []);

//   if (loading) return <Container>Loading...</Container>;
//   if (error) return <Container><Alert variant="danger">{error}</Alert></Container>;

//   return (
//     <Container className="py-4">
//       <h2 className="mb-4">Available Cars</h2>
//       <Row>
//         {cars.length === 0 ? (
//           <Alert variant="info">No cars available. Check back soon!</Alert>
//         ) : (
//           cars.map((car) => <CarCard key={car._id} car={car} />)
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default CarList;


import React, { useState, useEffect } from 'react';
import { Container, Row, Alert, Spinner } from 'react-bootstrap';
import CarCard from './CarCard';
import api from '../../services/api';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        setCars(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch cars');
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) return <Container className="text-center py-5"><Spinner animation="border" /></Container>;
  if (error) return <Container><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Available Cars</h2>
      <Row>
        {cars.length === 0 ? (
          <Alert variant="info">No cars available. Check back soon!</Alert>
        ) : (
          cars.map((car) => <CarCard key={car._id} car={car} />)
        )}
      </Row>
    </Container>
  );
};

export default CarList;