import React from 'react';

const Toast = ({ toast }) => {
  if (!toast.show) return null;

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
      <div 
        className="toast show align-items-center text-white bg-success border-0" 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body d-flex align-items-center">
            <span className="me-2" role="img" aria-label="success">✅</span>
            <strong>{toast.message}</strong>
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white me-2 m-auto" 
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;