import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Eye, Trash2, User, Mail, Calendar } from 'lucide-react';

const StudentCard = ({ student, onViewDetails, onDelete }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="text-center">
        {student.avatar ? (
          <img
            src={student.avatar}
            alt={student.name}
            className="rounded-circle mb-3"
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
        ) : (
          <div
            className="rounded-circle mx-auto mb-3 bg-secondary d-flex align-items-center justify-content-center"
            style={{ width: '80px', height: '80px' }}
          >
            <User size={32} className="text-white" />
          </div>
        )}
        
        <Card.Title className="mb-2">{student.name}</Card.Title>
        
        <div className="mb-1">
          <Badge bg="light" text="dark">ID: {student.id}</Badge>
        </div>
        
        <p className="card-text text-muted small mb-1 d-flex align-items-center justify-content-center">
          <Mail size={12} className="me-1" />
          {student.email}
        </p>
        
        <p className="card-text text-muted small mb-3 d-flex align-items-center justify-content-center">
          <Calendar size={12} className="me-1" />
          Age: {student.age}
        </p>
        
        <div className="d-flex gap-1 justify-content-center flex-wrap">
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onViewDetails(student)}
            className="d-flex align-items-center"
          >
            <Eye size={14} className="me-1" />
            View
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => onDelete(student.id)}
            className="d-flex align-items-center"
          >
            <Trash2 size={14} className="me-1" />
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;