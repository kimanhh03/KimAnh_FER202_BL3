import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, User, Mail, Phone, ShoppingBag } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { useValidation } from "../context/ValidationContext";

const Checkout = () => {
  const { bgClass, cardClass } = useTheme();
  const { addToast } = useToast();
  const { validateCheckout } = useValidation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validateCheckout(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      addToast("Order placed successfully 🎉", "success");
      navigate("/");
    } catch (error) {
      addToast("Payment failed. Try again.", "danger");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-vh-100 ${bgClass}`}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className={`shadow-lg ${cardClass}`}>
              <Card.Header className="bg-success text-white py-3 text-center">
                <h3 className="mb-0">
                  <ShoppingBag size={24} className="me-2" />
                  Checkout
                </h3>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <h5 className="mb-3">Billing Information</h5>
                  <Row className="g-3 mb-4">
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label>
                          <User size={16} className="me-1" />
                          First Name *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label>Last Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label>
                          <Mail size={16} className="me-1" />
                          Email *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label>
                          <Phone size={16} className="me-1" />
                          Phone *
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <h5 className="mb-3">Shipping Address</h5>
                  <Row className="g-3 mb-4">
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label>
                          <MapPin size={16} className="me-1" />
                          Address *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          isInvalid={!!errors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm={3}>
                      <Form.Group>
                        <Form.Label>City *</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          isInvalid={!!errors.city}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.city}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm={3}>
                      <Form.Group>
                        <Form.Label>ZIP Code *</Form.Label>
                        <Form.Control
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          isInvalid={!!errors.zipCode}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.zipCode}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <h5 className="mb-3">Payment Details</h5>
                  <Row className="g-3 mb-4">
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label>
                          <CreditCard size={16} className="me-1" />
                          Card Number *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          isInvalid={!!errors.cardNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cardNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm={3}>
                      <Form.Group>
                        <Form.Label>Expiry Date *</Form.Label>
                        <Form.Control
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          isInvalid={!!errors.expiryDate}
                          placeholder="MM/YY"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.expiryDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm={3}>
                      <Form.Group>
                        <Form.Label>CVV *</Form.Label>
                        <Form.Control
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          isInvalid={!!errors.cvv}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cvv}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label>Name on Card *</Form.Label>
                        <Form.Control
                          type="text"
                          name="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          isInvalid={!!errors.nameOnCard}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.nameOnCard}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="success"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={18} className="me-2" />
                          Place Order
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;
