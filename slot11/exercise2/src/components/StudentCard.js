import React from 'react';
import { Eye, Trash2, User, Mail, Calendar } from 'lucide-react';

const StudentCard = ({ student, onViewDetails, onDelete }) => (
  <div className="card h-100 shadow-sm">
    <div className="card-body text-center">
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
      <h5 className="card-title mb-2">{student.name}</h5>
      <p className="card-text text-muted small mb-1 d-flex align-items-center justify-content-center">
        <span className="badge bg-light text-dark">ID: {student.id}</span>
      </p>
      <p className="card-text text-muted small mb-1 d-flex align-items-center justify-content-center">
        <Mail size={12} className="me-1" />
        {student.email}
      </p>
      <p className="card-text text-muted small mb-3 d-flex align-items-center justify-content-center">
        <Calendar size={12} className="me-1" />
        Age: {student.age}
      </p>
      <div className="d-flex gap-1 justify-content-center flex-wrap">
        <button onClick={() => onViewDetails(student)} className="btn btn-primary btn-sm d-flex align-items-center">
          <Eye size={14} className="me-1" />
          View
        </button>
        <button onClick={() => onDelete(student.id)} className="btn btn-danger btn-sm d-flex align-items-center">
          <Trash2 size={14} className="me-1" />
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default StudentCard;