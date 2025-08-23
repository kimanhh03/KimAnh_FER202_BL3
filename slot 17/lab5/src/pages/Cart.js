import React from 'react';
import { Container, Row, Col, Card, Button, Table, Alert, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalItems, totalValue } = useCart();
  const { isAuthenticated } = useAuth();
  const { bgClass, cardClass } = useTheme();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    addToast('Item removed from cart', 'info');
  };

  const handleClearCart = () => {
    clearCart();
    addToast('Cart cleared', 'info');
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      addToast('Please login to proceed with checkout', 'warning');
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cartItems.length === 0) {
    return (
      <div className={`min-vh-100 ${bgClass}`}>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className={`text-center ${cardClass}`}>
                <Card.Body className="py-5">
                  <ShoppingCart size={64} className="text-muted mb-3" />
                  <h3 className="mb-3">Your Cart is Empty</h3>
                  <p className="text-muted mb-4">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <Button 
                    as={Link} 
                    to="/products" 
                    variant="success" 
                    size="lg"
                  >
                    Start Shopping
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className={`min-vh-100 ${bgClass}`}>
      <Container className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="display-5 fw-bold mb-0">
                <ShoppingCart size={36} className="me-2" />
                Shopping Cart ({totalItems} items)
              </h1>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={handleClearCart}
              >
                <Trash2 size={16} className="me-1" />
                Clear Cart
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Cart Items */}
          <Col lg={8}>
            <Card className={cardClass}>
              <Card.Header>
                <h5 className="mb-0">Cart Items</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th style={{ width: '50%' }}>Product</th>
                      <th style={{ width: '15%' }}>Price</th>
                      <th style={{ width: '20%' }}>Quantity</th>
                      <th style={{ width: '15%' }}>Total</th>
                      <th style={{ width: '5%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              style={{ 
                                width: '60px', 
                                height: '60px', 
                                objectFit: 'cover',
                                borderRadius: '8px'
                              }}
                              className="me-3"
                            />
                            <div>
                              <h6 className="mb-0">{item.name}</h6>
                              <small className="text-muted">
                                {item.description.slice(0, 50)}...
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <strong>${item.price}</strong>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="me-2"
                            >
                              <Minus size={14} />
                            </Button>
                            <Form.Control
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                              style={{ width: '60px', textAlign: 'center' }}
                              className="mx-1"
                            />
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="ms-2"
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                        </td>
                        <td className="align-middle">
                          <strong>${(parseFloat(item.price) * item.quantity).toFixed(2)}</strong>
                        </td>
                        <td className="align-middle">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          {/* Order Summary */}
          <Col lg={4}>
            <Card className={cardClass}>
              <Card.Header>
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${totalValue}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span className="text-success">Free</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>${(parseFloat(totalValue) * 0.1).toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong className="text-success">
                    ${(parseFloat(totalValue) * 1.1).toFixed(2)}
                  </strong>
                </div>

                {!isAuthenticated && (
                  <Alert 
                    variant="success" 
                    className="small mb-3 bg-light text-success border-success"
                  >
                    Please login to proceed with checkout
                  </Alert>
                )}

                <div className="d-grid gap-2">
                  <Button 
                    variant="success" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    <CreditCard size={18} className="me-2" />
                    {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                  </Button>
                  
                  <Button 
                    variant="outline-secondary"
                    onClick={handleContinueShopping}
                  >
                    <ArrowLeft size={16} className="me-1" />
                    Continue Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
