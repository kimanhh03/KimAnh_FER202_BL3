import React from 'react';
import { Navbar as BSNavbar, Container, Nav, Form } from 'react-bootstrap';
import { Home, Users, Info, Search, UserPlus } from 'lucide-react';

const Navbar = ({ quickSearch, setQuickSearch, onBuildProfile }) => {
  return (
    <BSNavbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <BSNavbar.Brand href="#" className="d-flex align-items-center">
          <Users size={24} className="me-2" />
          Student Management
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" className="d-flex align-items-center">
              <Home size={18} className="me-1" />
              Home
            </Nav.Link>
            <Nav.Link href="#" className="d-flex align-items-center">
              <Users size={18} className="me-1" />
              Students
            </Nav.Link>
            <Nav.Link 
              onClick={onBuildProfile} 
              className="d-flex align-items-center"
              style={{ cursor: 'pointer' }}
            >
              <UserPlus size={18} className="me-1" />
              Build your Profile
            </Nav.Link>
            <Nav.Link href="#" className="d-flex align-items-center">
              <Info size={18} className="me-1" />
              About
            </Nav.Link>
          </Nav>
          
          <Form className="d-flex position-relative">
            <div className="position-relative">
              <Search 
                size={18} 
                className="position-absolute text-muted" 
                style={{ 
                  left: '10px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  zIndex: 10 
                }} 
              />
              <Form.Control
                type="search"
                placeholder="Quick search..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                style={{ width: '250px', paddingLeft: '35px' }}
              />
            </div>
          </Form>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;