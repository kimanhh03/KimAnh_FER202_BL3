import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AboutForm = ({ state, updateField, handleFileChange, markFieldTouched }) => {
  const { about } = state;
  
  const handleBlur = (field) => {
    markFieldTouched('about', field);
  };
  
  return (
    <Row>
      <Col md={4} className="text-center">
        <div className="mb-3">
          <div 
            className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-2"
            style={{ 
              width: '100px', 
              height: '100px', 
              border: '3px solid #dee2e6',
              cursor: 'pointer'
            }}
            onClick={() => document.getElementById('avatar-input').click()}
          >
            {about.avatar ? (
              <img 
                src={URL.createObjectURL(about.avatar)} 
                alt="Avatar" 
                className="rounded-circle"
                style={{ width: '94px', height: '94px', objectFit: 'cover' }}
              />
            ) : (
              <div className="text-muted">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            )}
          </div>
          <small className="text-muted fw-bold">CHOOSE PICTURE</small>
          <Form.Control 
            id="avatar-input"
            type="file" 
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      </Col>
      
      <Col md={8}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="First Name"
              value={about.firstName}
              onChange={(e) => updateField('about', 'firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
              isInvalid={state.touched.about.firstName && !about.firstName}
            />
            {state.touched.about.firstName && !about.firstName && (
              <Form.Control.Feedback type="invalid">
                Please enter your first name
              </Form.Control.Feedback>
            )}
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={about.lastName}
              onChange={(e) => updateField('about', 'lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              isInvalid={state.touched.about.lastName && !about.lastName}
            />
            {state.touched.about.lastName && !about.lastName && (
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            )}
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={about.email}
              onChange={(e) => updateField('about', 'email', e.target.value)}
              onBlur={() => handleBlur('email')}
              isInvalid={state.touched.about.email && (!about.email || !/\S+@\S+\.\S+/.test(about.email))}
            />
            {state.touched.about.email && !about.email && (
              <Form.Control.Feedback type="invalid">
                Please enter your email
              </Form.Control.Feedback>
            )}
            {state.touched.about.email && about.email && !/\S+@\S+\.\S+/.test(about.email) && (
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

AboutForm.propTypes = {
  state: PropTypes.object.isRequired,
  updateField: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  markFieldTouched: PropTypes.func.isRequired
};

export default AboutForm;