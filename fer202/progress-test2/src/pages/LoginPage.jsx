import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaUser, FaLock, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavBarComponent from '../components/Navbar';
import api from '../services/api';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginError('');

        try {
            // Fetch accounts from db.json
            const { data: accounts } = await api.get('/accounts');
            
            // Find matching account
            const foundAccount = accounts.find(
                account => account.email === loginData.email && 
                          account.password === loginData.password &&
                          account.isActive === true
            );

            if (foundAccount) {
                // Login successful
                alert(`Welcome, ${foundAccount.email}!`);
                // TODO: Save user to context/localStorage for persistent login
                navigate('/products');
            } else {
                setLoginError('Invalid email or password, or account is not active');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    return (
        <>
            <NavBarComponent />
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="shadow">
                            <Card.Header className="bg-primary text-white text-center py-3">
                                <FaUser size={24} className="mb-2" />
                                <h4 className="mb-0">Login</h4>
                            </Card.Header>
                            
                            <Card.Body className="p-4">
                                <Button 
                                    variant="outline-secondary" 
                                    size="sm" 
                                    className="mb-3"
                                    onClick={() => navigate('/products')}
                                >
                                    <FaArrowLeft className="me-1" />
                                    Back to Products
                                </Button>

                                {loginError && (
                                    <Alert variant="danger" className="mb-3">
                                        {loginError}
                                    </Alert>
                                )}
                                
                                <Form onSubmit={handleLoginSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <FaUser className="me-1" />
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={loginData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-4">
                                        <Form.Label>
                                            <FaLock className="me-1" />
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={loginData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                    
                                    <div className="d-grid">
                                        <Button 
                                            variant="primary" 
                                            type="submit"
                                            size="lg"
                                            disabled={loading}
                                        >
                                            {loading ? 'Logging in...' : 'Login'}
                                        </Button>
                                    </div>
                                </Form>

                                <hr className="my-4" />
                                
                                <div className="text-center">
                                    <small className="text-muted">
                                        <strong>Test Accounts:</strong><br />
                                        <code>admin@example.com</code> / <code>Admin123@</code><br />
                                        <code>traltb@fe.edu.vn</code> / <code>Traltb123@</code>
                                    </small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;