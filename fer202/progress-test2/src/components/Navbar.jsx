import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/products">
                    <strong>ShopPhone</strong>
                </Navbar.Brand>
                
                <Nav className="ms-auto">
                    <Nav.Link href="#favourites" className="d-flex align-items-center me-3">
                        <FaHeart className="me-1" />
                        Favourites
                    </Nav.Link>
                    
                    <Nav.Link href="#cart" className="d-flex align-items-center me-3">
                        <FaShoppingCart className="me-1" />
                        Cart
                    </Nav.Link>
                    
                    <Nav.Link 
                        href="#login" 
                        className="d-flex align-items-center"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLoginClick();
                        }}
                    >
                        <FaUser className="me-1" />
                        Login
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;