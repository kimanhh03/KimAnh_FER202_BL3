import React from 'react';
import { Container } from 'react-bootstrap';

const Hero = () => {
  return (
    <section 
      className="bg-primary text-white py-5" 
      style={{
        background: 'linear-gradient(135deg, #007bff 0%, #6f42c1 100%)'
      }}
    >
      <Container className="text-center">
        <h1 className="display-4 fw-bold mb-3">Student Management</h1>
        <p className="lead">Manage and view student information efficiently</p>
      </Container>
    </section>
  );
};

export default Hero;