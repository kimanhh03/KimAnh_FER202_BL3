import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Film } from 'lucide-react'

export default function AppNavbar({ setActivePage }) {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
    >
      <Container>
        <Navbar.Brand
          href="#"
          className="d-flex align-items-center gap-2"
          onClick={() => setActivePage('free-movies')}
        >
          <Film size={20} />
          Movie Explorer
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link onClick={() => setActivePage('free-movies')}>Free Movies</Nav.Link>
            <Nav.Link onClick={() => setActivePage('favourite-movies')}>My Favourite Movies</Nav.Link>
            <Nav.Link onClick={() => setActivePage('movie-request-form')}>Movie Request Form</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
