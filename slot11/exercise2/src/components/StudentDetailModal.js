import React from 'react';
import { X, User, Mail, Calendar, Image, Hash } from 'lucide-react';

const StudentDetailModal = ({ student, isOpen, onClose }) => {
  if (!isOpen || !student) return null;
   
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title d-flex align-items-center">
              <User size={20} className="me-2" />
              Student Details
            </h5>
            <button type="button" className="btn-close" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
          <div className="modal-body text-center">
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
            <div className="row g-3 text-start">
              <div className="col-12">
                <div className="border-bottom pb-2 d-flex justify-content-between align-items-center">
                  <span className="fw-semibold d-flex align-items-center">
                    <Hash size={16} className="me-1" />
                    ID:
                  </span>
                  <span>{student.id}</span>
                </div>
              </div>
              <div className="col-12">
                <div className="border-bottom pb-2 d-flex justify-content-between align-items-center">
                  <span className="fw-semibold d-flex align-items-center">
                    <Mail size={16} className="me-1" />
                    Email:
                  </span>
                  <span>{student.email}</span>
                </div>
              </div>
              <div className="col-12">
                <div className="border-bottom pb-2 d-flex justify-content-between align-items-center">
                  <span className="fw-semibold d-flex align-items-center">
                    <Calendar size={16} className="me-1" />
                    Age:
                  </span>
                  <span>{student.age}</span>
                </div>
              </div>
              <div className="col-12">
                <div className="border-bottom pb-2 d-flex justify-content-between align-items-center">
                  <span className="fw-semibold d-flex align-items-center">
                    <Image size={16} className="me-1" />
                    Avatar:
                  </span>
                  <span>{student.avatar ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary w-100" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;