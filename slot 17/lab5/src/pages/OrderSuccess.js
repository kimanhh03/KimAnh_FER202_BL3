import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const OrderSuccess = () => {
  const { bgClass, cardClass } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
  const estimatedDelivery = new Date(Date.now() + 45 * 60000); // 45 minutes from now

  return (
    <div className={`min-vh-100 ${bgClass}`}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            {/* Success Header */}
            <Card className={`text-center mb-4 ${cardClass}`}>
              <Card.Body className="py-5">
                <div className="mb-4">
                  <CheckCircle size={80} className="text-success mb-3" />
                  <h1 className="display-5 fw-bold mb-3">Order Placed Successfully!</h1>
                  <p className="lead text-muted">
                    Thank you for your order, {user?.name}. We're preparing your delicious meal!
                  </p>
                </div>
                
                <Alert variant="success" className="mb-4">
                  <strong>Order Number:</strong> #{orderNumber}
                </Alert>
                
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <div className="border rounded p-3">
                      <Package size={24} className="text-primary mb-2" />
                      <h6 className="mb-1">Estimated Delivery</h6>
                      <p className="text-muted mb-0">
                        {estimatedDelivery.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="border rounded p-3">
                      <CheckCircle size={24} className="text-success mb-2" />
                      <h6 className="mb-1">Payment Status</h6>
                      <p className="text-success mb-0 fw-semibold">Confirmed</p>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Button 
                    as={Link} 
                    to="/" 
                    variant="primary" 
                    size="lg"
                  >
                    <Home size={18} className="me-2" />
                    Back to Home
                  </Button>
                  
                  <Button 
                    as={Link} 
                    to="/products" 
                    variant="outline-primary" 
                    size="lg"
                  >
                    <ShoppingBag size={18} className="me-2" />
                    Continue Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            {/* Order Status Steps */}
            <Card className={cardClass}>
              <Card.Header>
                <h5 className="mb-0">Order Status</h5>
              </Card.Header>
              <Card.Body>
                <div className="row text-center">
                  <div className="col">
                    <div className="mb-2">
                      <CheckCircle size={24} className="text-success" />
                    </div>
                    <small className="fw-semibold">Order Received</small>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <div 
                        className="spinner-border spinner-border-sm text-primary" 
                        role="status"
                      />
                    </div>
                    <small className="fw-semibold">Preparing</small>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <div 
                        className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center"
                        style={{ width: '24px', height: '24px' }}
                      >
                        <Package size={14} className="text-muted" />
                      </div>
                    </div>
                    <small className="text-muted">On the Way</small>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <div 
                        className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center"
                        style={{ width: '24px', height: '24px' }}
                      >
                        <CheckCircle size={14} className="text-muted" />
                      </div>
                    </div>
                    <small className="text-muted">Delivered</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderSuccess;