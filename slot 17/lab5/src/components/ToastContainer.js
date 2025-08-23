import React from 'react';
import { Toast, ToastContainer as BSToastContainer } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const getToastIcon = (variant) => {
    switch (variant) {
      case 'success':
        return <CheckCircle size={16} className="me-2" />;
      case 'danger':
        return <AlertCircle size={16} className="me-2" />;
      case 'info':
        return <Info size={16} className="me-2" />;
      default:
        return <CheckCircle size={16} className="me-2" />;
    }
  };

  const getToastBg = (variant) => {
    switch (variant) {
      case 'success':
        return 'success';
      case 'danger':
        return 'danger';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      default:
        return 'success';
    }
  };

  return (
    <BSToastContainer 
      position="top-end" 
      className="position-fixed"
      style={{ zIndex: 1055, top: '80px', right: '20px' }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          show={true}
          onClose={() => removeToast(toast.id)}
          delay={3000}
          autohide
          bg={getToastBg(toast.variant)}
        >
          <Toast.Header closeButton={false}>
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="d-flex align-items-center text-white">
                {getToastIcon(toast.variant)}
                <strong className="me-auto">Notification</strong>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={() => removeToast(toast.id)}
              >
                <X size={14} />
              </button>
            </div>
          </Toast.Header>
          <Toast.Body className="text-white">
            {toast.message}
          </Toast.Body>
        </Toast>
      ))}
    </BSToastContainer>
  );
};

export default ToastContainer;