import React from 'react';
import { Navbar, Nav, NavDropdown, Badge, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavourite } from '../context/FavouriteContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, Heart, User, Moon, Sun, Home, UserPlus } from 'lucide-react';

const NavBar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const { totalFavourites } = useFavourite();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
  };

  // class cho navbar
  const navbarClass =
    theme === "dark"
      ? "bg-secondary navbar-dark"
      : "bg-light navbar-light";

  return (
    <Navbar expand="lg" className={`${navbarClass}`} sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Food Paradise
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <Home size={18} className="me-1" />
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Food Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              <UserPlus size={18} className="me-1" />
              Register Account
            </Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            <Nav.Link onClick={toggleTheme} className="me-2">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Nav.Link>
            
            <Nav.Link as={Link} to="/favourites" className="me-2 position-relative">
              <Heart size={24} />
              {totalFavourites > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {totalFavourites}
                </Badge>
              )}
            </Nav.Link>
            
            <Nav.Link as={Link} to="/cart" className="me-3 position-relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <Badge
                  bg="success"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>
            
            {isAuthenticated ? (
              <NavDropdown
                title={
                  <span>
                    <User size={20} className="me-1" />
                    {user?.name || 'User'}
                  </span>
                }
                id="user-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/favourites">
                  My Favourites
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">
                <User size={20} className="me-1" />
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
