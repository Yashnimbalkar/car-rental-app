import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        {/* Brand on the left */}
        <BootstrapNavbar.Brand as={Link} to="/">
          Car Rental App
        </BootstrapNavbar.Brand>

        {/* Hamburger button for mobile */}
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />

        {/* Collapsible menu */}
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;


