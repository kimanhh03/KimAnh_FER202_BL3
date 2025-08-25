import { Navbar, Nav, Container, Badge, Dropdown, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { User, ShoppingCart, Heart, LogOut, Sun, Moon, Home, Package } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { useTheme } from "../contexts/ThemeContext"

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { count: cartCount } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { theme, toggleTheme } = useTheme()

  return (
    <Navbar
      bg={theme === "dark" ? "dark" : "light"}
      variant={theme}
      expand="lg"
      className="mb-4 shadow-sm"
      style={{ borderBottom: "2px solid #ddd" }}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center">
            <Package size={28} className="me-2 text-warning" />
            <strong>Handbag Store</strong>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Main Navigation */}
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link className="d-flex align-items-center px-3">
                <Home size={18} className="me-1" />
                Home
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/products">
              <Nav.Link className="d-flex align-items-center px-3">
                <Package size={18} className="me-1" />
                Products
              </Nav.Link>
            </LinkContainer>
          </Nav>

          {/* Right Side Navigation */}
          <Nav className="ms-auto">
            {/* Theme Switch */}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleTheme}
              className="me-2 d-flex align-items-center rounded border"
              style={{ border: "1px solid #aaa" }}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>

            {/* Wishlist */}
            <LinkContainer to="/wishlist">
              <Nav.Link className="d-flex align-items-center px-2 rounded border me-2 position-relative">
                <Heart size={20} className="me-1" />
                <span className="d-none d-md-inline">Wishlist</span>
                {wishlistItems.length > 0 && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle rounded-pill"
                    style={{ fontSize: '0.7em' }}
                  >
                    {wishlistItems.length}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* Cart */}
            <LinkContainer to="/cart">
              <Nav.Link className="d-flex align-items-center px-2 rounded border me-2 position-relative">
                <ShoppingCart size={20} className="me-1" />
                <span className="d-none d-md-inline">Cart</span>
                {cartCount > 0 && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle rounded-pill"
                    style={{ fontSize: '0.7em' }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* User */}
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant={theme === "dark" ? "outline-light" : "outline-dark"}
                  id="user-dropdown"
                  className="d-flex align-items-center rounded border"
                  style={{ border: "1px solid #aaa" }}
                >
                  <User size={20} className="me-1" />
                  <span className="d-none d-md-inline">{user?.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>Hello, {user?.name}</Dropdown.Header>
                  <Dropdown.Divider />
                  
                  <LinkContainer to="/profile">
                    <Dropdown.Item>
                      <User size={16} className="me-2" />
                      Profile
                    </Dropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/wishlist">
                    <Dropdown.Item>
                      <Heart size={16} className="me-2" />
                      Wishlist
                    </Dropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/orders">
                    <Dropdown.Item>
                      <Package size={16} className="me-2" />
                      My Orders
                    </Dropdown.Item>
                  </LinkContainer>

                  <Dropdown.Divider />
                  
                  <Dropdown.Item onClick={logout} className="text-danger">
                    <LogOut size={16} className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link className="d-flex align-items-center px-2 rounded border">
                  <User size={20} className="me-1" />
                  <span className="d-none d-md-inline">Login</span>
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
