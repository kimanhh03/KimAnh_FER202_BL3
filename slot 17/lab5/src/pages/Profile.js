import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { User, Mail, Phone, MapPin, Save, Edit3, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { bgClass, cardClass } = useTheme();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const [originalData, setOriginalData] = useState(formData);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setOriginalData(formData);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSave = () => {
    // Here you would typically send the data to an API
    // For now, we'll just simulate saving
    addToast('Profile updated successfully!', 'success');
    setIsEditing(false);
    setOriginalData(formData);
  };

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'info');
    navigate('/');
  };

  return (
    <div className={`min-vh-100 ${bgClass}`}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            {/* Profile Header */}
            <Card className={`mb-4 ${cardClass}`}>
              <Card.Header className="bg-primary text-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">
                    <User size={24} className="me-2" />
                    My Profile
                  </h3>
                  <Button 
                    variant="outline-light" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="me-1" />
                    Logout
                  </Button>
                </div>
              </Card.Header>

              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div 
                    className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <h4 className="mt-3 mb-1">{user?.name}</h4>
                  <p className="text-muted mb-0">{user?.email}</p>
                </div>

                <Form>
                  <Row className="g-3">
                    {/* Name Field */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          <User size={16} className="me-1" />
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Enter your full name"
                        />
                      </Form.Group>
                    </Col>

                    {/* Email Field */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          <Mail size={16} className="me-1" />
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Enter your email"
                        />
                      </Form.Group>
                    </Col>

                    {/* Phone Field */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          <Phone size={16} className="me-1" />
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Enter your phone number"
                        />
                      </Form.Group>
                    </Col>

                    {/* Address Field */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          <MapPin size={16} className="me-1" />
                          Address
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Enter your address"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Action Buttons */}
                  <div className="text-center mt-4">
                    {!isEditing ? (
                      <Button 
                        variant="primary" 
                        size="lg"
                        onClick={handleEdit}
                      >
                        <Edit3 size={18} className="me-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="d-flex gap-3 justify-content-center">
                        <Button 
                          variant="success" 
                          size="lg"
                          onClick={handleSave}
                        >
                          <Save size={18} className="me-2" />
                          Save Changes
                        </Button>
                        <Button 
                          variant="outline-secondary" 
                          size="lg"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* Account Information */}
            <Row className="g-4">
              <Col md={6}>
                <Card className={cardClass}>
                  <Card.Header>
                    <h5 className="mb-0">Account Statistics</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span>Member Since:</span>
                      <span className="fw-semibold">January 2024</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span>Total Orders:</span>
                      <span className="fw-semibold">12</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Account Status:</span>
                      <span className="badge bg-success">Active</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className={cardClass}>
                  <Card.Header>
                    <h5 className="mb-0">Preferences</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span>Email Notifications:</span>
                      <Form.Check type="switch" defaultChecked />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span>SMS Notifications:</span>
                      <Form.Check type="switch" />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Marketing Updates:</span>
                      <Form.Check type="switch" defaultChecked />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;