// import React from 'react';
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <Container className="text-center py-5">
//       <Row>
//         <Col>
//           <h1 className="display-4 mb-4">Welcome to Car Rental Pro</h1>
//           <p className="lead">Rent your dream car with ease. Professional service, best prices.</p>
//           <Link to="/cars">
//             <Button variant="primary" size="lg">Browse Cars</Button>
//           </Link>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Home;


import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure this file exists for styles

const Home = () => {
  return (
    <Container className="py-5">
      {/* Hero Section with Single Car Image */}
      <div className="text-center mb-5">
        <h1>Welcome to Car Rental Pro</h1>
        <p className="lead">Rent your dream car today! Browse our premium selection.</p>
        <img
          src="https://tse4.mm.bing.net/th/id/OIP.9zvVcW0z-VDYJo30Tk-hqAHaE8?pid=Api&P=0&h=180"
          alt="BMW M5"
          className="img-fluid mb-3"
          style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
        />
        <Button as={Link} to="/cars" variant="primary" size="lg">Browse Cars</Button>
      </div>

      {/* Car Brand Logos */}
      <h2 className="text-center mb-4">Our Trusted Brands</h2>
      <Row className="text-center mb-5">
        {[
          { name: 'Maruti Suzuki', logo: 'https://tse3.mm.bing.net/th/id/OIP.cwCvNQfTWIeht39Fdk5hSgHaEK?pid=Api&P=0&h=180' },
          { name: 'Tata Motors', logo: 'https://tse4.mm.bing.net/th/id/OIP.jRWl-psiwU6foMM9YyIyIQHaEK?pid=Api&P=0&h=180' },
          { name: 'Mahindra & Mahindra', logo: 'https://tse3.mm.bing.net/th/id/OIP.gs6t-lvUao8F8QWmsj_ATgHaEK?pid=Api&P=0&h=180' },
          { name: 'Hyundai', logo: 'https://tse2.mm.bing.net/th/id/OIP.TQ_q90gI_wfTnXO2Tldq9gHaEK?pid=Api&P=0&h=180' },
          { name: 'Toyota', logo: 'https://tse1.mm.bing.net/th/id/OIP.ml9uowvytRumUCKfOy6HJQHaFQ?pid=Api&P=0&h=180' },
          { name: 'Kia', logo: 'https://tse1.mm.bing.net/th/id/OIP.YgfithH2OEfv3z_q8uKkbAHaCb?pid=Api&P=0&h=180' },
          { name: 'Honda', logo: 'https://tse3.mm.bing.net/th/id/OIP.zBd3RHUUVCQQ8fUAEaMPEAHaEK?pid=Api&P=0&h=180' },
          { name: 'Renault', logo: 'https://tse3.mm.bing.net/th/id/OIP.TMazL6uTEURMypoTDvuShwHaEK?pid=Api&P=0&h=180' },
          { name: 'Skoda', logo: 'https://tse3.mm.bing.net/th/id/OIP.WCyBopLRvlI-yLGymYW1yQHaEK?pid=Api&P=0&h=180' },
          { name: 'Volkswagen', logo: 'https://tse1.mm.bing.net/th/id/OIP.nWwURWXofkBzcHT7OuydYAHaHd?pid=Api&P=0&h=180' },
          { name: 'Mercedes-Benz', logo: 'https://tse2.mm.bing.net/th/id/OIP.qJB1xupBQf0rV09XvJqBXgHaHa?pid=Api&P=0&h=180' },
          { name: 'BMW', logo: 'https://tse2.mm.bing.net/th/id/OIP.hkVf2TpEDyJw-4sfmh28bAHaHD?pid=Api&P=0&h=180' },
          { name: 'Audi', logo: 'https://tse4.mm.bing.net/th/id/OIP.3Dc2zs7TGdTbUncIhZM0YwHaFi?pid=Api&P=0&h=180' },
          { name: 'MG Motor', logo: 'https://tse1.mm.bing.net/th/id/OIP.tmfIgDed2UeFqpNMPyyKMQHaEK?pid=Api&P=0&h=180' },
          { name: 'Citroën', logo: 'https://tse4.mm.bing.net/th/id/OIP.FHrS4w_98gNnYUKJQKiNZwHaG1?pid=Api&P=0&h=180' },
          { name: 'Nissan', logo: 'https://tse4.mm.bing.net/th/id/OIP.14CBI4Ld4bqVZ86J1_TiLgHaEK?pid=Api&P=0&h=180' }
        ].map((brand) => (
          <Col xs={6} md={3} lg={2} key={brand.name} className="mb-3">
            <img src={brand.logo} alt={brand.name} className="brand-logo" />
            <p>{brand.name}</p>
          </Col>
        ))}
      </Row>

      {/* Fake Reviews */}
      <h2 className="text-center mb-4">What Our Customers Say</h2>
      <Row className="mb-5">
        {[
          {
            name: 'Amit Sharma',
            review: 'Amazing experience! The car was clean, and the booking process was seamless.',
            rating: '★★★★★'
          },
          {
            name: 'Priya Singh',
            review: 'Great selection of cars at affordable prices. Highly recommend!',
            rating: '★★★★☆'
          },
          {
            name: 'Rahul Verma',
            review: 'Superb customer service and easy pickup. Will rent again!',
            rating: '★★★★★'
          },
          {
            name: 'Sneha Patel',
            review: 'Loved the flexibility in choosing dates. Fantastic service!',
            rating: '★★★★☆'
          }
        ].map((review, index) => (
          <Col md={6} lg={3} key={index} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{review.name}</Card.Title>
                <Card.Text>{review.review}</Card.Text>
                <Card.Text><strong>{review.rating}</strong></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <Container>
          <Row>
            <Col md={4} className="mb-3">
              <h5>Car Rental Pro</h5>
              <p>Your trusted partner for premium car rentals since 2025.</p>
            </Col>
            <Col md={4} className="mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/cars" className="text-white">Browse Cars</Link></li>
                <li><Link to="/login" className="text-white">Login</Link></li>
                <li><Link to="/signup" className="text-white">Signup</Link></li>
              </ul>
            </Col>
            <Col md={4} className="mb-3">
              <h5>Contact Us</h5>
              <p>Email: support@carrentalpro.com</p>
              <p>Phone: +91 123-456-7890</p>
              <p>Address: 123 Drive St, Mumbai, India</p>
            </Col>
          </Row>
          <p className="mt-3">&copy; 2025 Car Rental Pro. All rights reserved.</p>
        </Container>
      </footer>
    </Container>
  );
};

export default Home;