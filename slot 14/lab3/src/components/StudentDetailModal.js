import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { User, Mail, Calendar, Image, Hash } from 'lucide-react';

const StudentDetailModal = ({ student, show, onHide }) => {
  if (!student) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <User size={20} className="me-2" />
          Student Details
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="text-center">
        {student.avatar ? (
          <img
            src={student.avatar}
            alt={student.name}
            className="rounded-circle mb-3"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
        ) : (
          <div
            className="rounded-circle mx-auto mb-3 bg-secondary d-flex align-items-center justify-content-center"
            style={{ width: '120px', height: '120px' }}
          >
            <User size={48} className="text-white" />
          </div>
        )}
        
        <h4 className="mb-4">{student.name}</h4>
        
        <div className="text-start">
          <div className="border-bottom pb-2 mb-2 d-flex justify-content-between align-items-center">
            <span className="fw-semibold d-flex align-items-center">
              <Hash size={16} className="me-1" />
              ID:
            </span>
            <span>{student.id}</span>
          </div>
          
          <div className="border-bottom pb-2 mb-2 d-flex justify-content-between align-items-center">
            <span className="fw-semibold d-flex align-items-center">
              <Mail size={16} className="me-1" />
              Email:
            </span>
            <span>{student.email}</span>
          </div>
          
          <div className="border-bottom pb-2 mb-2 d-flex justify-content-between align-items-center">
            <span className="fw-semibold d-flex align-items-center">
              <Calendar size={16} className="me-1" />
              Age:
            </span>
            <span>{student.age}</span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-semibold d-flex align-items-center">
              <Image size={16} className="me-1" />
              Avatar:
            </span>
            <span>{student.avatar ? "Yes" : "No"}</span>
          </div>
        </div>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="primary" onClick={onHide} className="w-100">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentDetailModal;