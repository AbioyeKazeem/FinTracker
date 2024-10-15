import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar variant="dark" expand="lg" className='navBar'>
      <Container fluid>
        <Navbar.Brand as={Link} to="/login">
          <AccountBalanceIcon style={{ fontSize: 25, color: '#ffffff', marginRight: '2px' }} />
          FinTracker
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="/chart">FinChart</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
