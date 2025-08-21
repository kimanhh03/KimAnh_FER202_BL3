import React, { useState } from "react";
import { Navbar, Container, Form } from "react-bootstrap";

const Header = ({ onToggleDarkMode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = () => {
    setDarkMode(!darkMode);
    onToggleDarkMode(!darkMode);
  };

  return (
    <Navbar
      bg={darkMode ? "dark" : "light"}
      variant={darkMode ? "dark" : "light"}
      className="border-bottom shadow-sm"
    >
      <Container className="d-flex justify-content-between">
        <Navbar.Brand className="fw-bold">🍽️ Food Ordering App</Navbar.Brand>
        <Form.Check
          type="switch"
          id="dark-mode-switch"
          label="Dark Mode"
          checked={darkMode}
          onChange={handleChange}
          className="ms-auto"
        />
      </Container>
    </Navbar>
  );
};

export default Header;
