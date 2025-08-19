import React from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { Filter, Search, Image } from 'lucide-react';

const Filters = ({ 
  searchTerm, 
  setSearchTerm, 
  ageRange, 
  setAgeRange, 
  hasAvatar, 
  setHasAvatar 
}) => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="mb-4 d-flex align-items-center">
          <Filter size={20} className="me-2 text-primary" />
          Filters
        </Card.Title>
        
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-semibold d-flex align-items-center">
                <Search size={16} className="me-1" />
                Search by name/email
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-semibold">Age Range</Form.Label>
              <Form.Select 
                value={ageRange} 
                onChange={(e) => setAgeRange(e.target.value)}
              >
                <option value="all">All Ages</option>
                <option value="<=20">≤ 20</option>
                <option value="21-25">21 - 25</option>
                <option value=">25">&gt; 25</option>
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-semibold d-flex align-items-center">
                <Image size={16} className="me-1" />
                Avatar Filter
              </Form.Label>
              <Form.Check
                type="checkbox"
                label="Has Avatar Only"
                checked={hasAvatar}
                onChange={(e) => setHasAvatar(e.target.checked)}
                className="mt-2"
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Filters;