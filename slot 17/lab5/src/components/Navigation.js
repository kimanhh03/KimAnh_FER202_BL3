import React from "react";
import { Navbar, Nav, Container, Dropdown, Badge, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { User, Heart, ShoppingCart, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useFavourite } from "../context/FavouriteContext";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  const { darkMode, toggleTheme, navClass } = useTheme();
  const { totalItems } = useCart();
  const { totalFavourites } = useFavourite();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Navbar bg={navClass} variant={navClass} expand="lg" className="shadow-sm">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold">
            🍽️ Food Ordering App
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Register Account</Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav className="align-items-center">
            {/* Theme Toggle */}
            <Form.Check
              type="switch"
              id="theme-switch"
              checked={darkMode}
              onChange={toggleTheme}
              className="me-3"
              label={darkMode ? <Moon size={18} /> : <Sun size={18} />}
            />

            {/* Cart */}
            <LinkContainer to="/cart">
              <Nav.Link className="position-relative me-3">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge 
                    bg="danger" 
                    pill 
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* Favourites */}
            <LinkContainer to="/favourites">
              <Nav.Link className="position-relative me-3">
                <Heart size={20} />
                {totalFavourites > 0 && (
                  <Badge 
                    bg="danger" 
                    pill 
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {totalFavourites}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* User Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="text-decoration-none border-0 bg-transparent">
                <User size={20} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {isAuthenticated ? (
                  <>
                    <Dropdown.Header>
                      Welcome, {user?.name || user?.email}
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <LinkContainer to="/profile">
                      <Dropdown.Item>Profile</Dropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/favourites">
                      <Dropdown.Item>My Favourites</Dropdown.Item>
                    </LinkContainer>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout}>
                      Logout
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <LinkContainer to="/login">
                      <Dropdown.Item>Login</Dropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/register">
                      <Dropdown.Item>Register</Dropdown.Item>
                    </LinkContainer>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;