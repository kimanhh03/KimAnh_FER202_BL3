import React from 'react';
import { Modal, Nav, Button, Toast, ToastContainer, Card } from 'react-bootstrap';
import { useProfileWizard } from '../hooks/useProfileWizard';
import AboutForm from './AboutForm';
import AccountForm from './AccountForm';
import AddressForm from './AddressForm';

const ProfileWizard = ({ show, onHide }) => {
  const {
    state,
    showPassword,
    showConfirmPassword,
    showResult,
    showToast,
    setShowPassword,
    setShowConfirmPassword,
    setShowToast,
    updateField,
    markFieldTouched,
    handleFileChange,
    validateStep,
    nextStep,
    prevStep,
    handleFinish,
    resetWizard,
    dispatch
  } = useProfileWizard();

  const steps = ['About', 'Account', 'Address'];

  const handleClose = () => {
    onHide();
    resetWizard();
  };

  const renderStepContent = () => {
    switch (state.currentStep) {
      case 0:
        return (
          <AboutForm 
            state={state} 
            updateField={updateField} 
            handleFileChange={handleFileChange}
            markFieldTouched={markFieldTouched}
          />
        );
      case 1:
        return (
          <AccountForm 
            state={state} 
            updateField={updateField}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            setShowPassword={setShowPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            markFieldTouched={markFieldTouched}
          />
        );
      case 2:
        return (
          <AddressForm 
            state={state} 
            updateField={updateField}
            markFieldTouched={markFieldTouched}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>BUILD YOUR PROFILE</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Tabs */}
          <Nav variant="tabs" className="mb-4">
            {steps.map((step, index) => (
              <Nav.Item key={step} style={{ flex: 1 }}>
                <Nav.Link
                  active={state.currentStep === index}
                  disabled={index > state.currentStep}
                  onClick={() => {
                    if (index <= state.currentStep) {
                      dispatch({ type: 'SET_STEP', step: index });
                    }
                  }}
                  className="text-center"
                  style={{
                    cursor: index <= state.currentStep ? 'pointer' : 'not-allowed',
                    backgroundColor: state.currentStep === index ? '#007bff' : 'transparent',
                    color: state.currentStep === index ? 'white' : 
                           index <= state.currentStep ? '#007bff' : '#6c757d',
                    borderColor: state.currentStep === index ? '#007bff' : 
                                index <= state.currentStep ? '#007bff' : '#dee2e6',
                    fontWeight: state.currentStep === index ? 'bold' : 'normal'
                  }}
                >
                  {step}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {!showResult && renderStepContent()}

          {/* Buttons */}
          {!showResult && (
            <div className="d-flex justify-content-between mt-4">
              {state.currentStep > 0 ? (
                <Button variant="outline-primary" onClick={prevStep}>
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              
              {state.currentStep < 2 ? (
                <Button 
                  variant="primary" 
                  onClick={nextStep} 
                  disabled={!validateStep}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  onClick={handleFinish}
                  disabled={!validateStep}
                >
                  Finish
                </Button>
              )}
            </div>
          )}

          {/* Result Display */}
          {showResult && (
            <Card>
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Your Profile</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <h6>Avatar:</h6>
                  {state.about.avatar && (
                    <img 
                      src={URL.createObjectURL(state.about.avatar)} 
                      alt="Avatar" 
                      className="rounded-circle"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  )}
                </div>
                
                <div className="mb-3">
                  <h6>About:</h6>
                  <p><strong>Name:</strong> {state.about.firstName} {state.about.lastName}</p>
                  <p><strong>Email:</strong> {state.about.email}</p>
                </div>

                <div className="mb-3">
                  <h6>Account:</h6>
                  <p><strong>Username:</strong> {state.account.username}</p>
                  <p><strong>Secret Question:</strong> {
                    state.account.secretQuestion === 'pet' ? "What is your first pet's name?" :
                    state.account.secretQuestion === 'maiden' ? "What is your mother's maiden name?" :
                    state.account.secretQuestion === 'city' ? "In which city were you born?" :
                    state.account.secretQuestion === 'teacher' ? "Who was your favorite teacher?" : ''
                  }</p>
                  <p><strong>Answer:</strong> {state.account.answer}</p>
                </div>

                <div className="mb-3">
                  <h6>Address:</h6>
                  <p><strong>Address:</strong> {state.address.address}</p>
                  <p><strong>City:</strong> {state.address.city}</p>
                  <p><strong>Country:</strong> {state.address.country}</p>
                </div>

                <Button variant="danger" onClick={resetWizard}>
                  Reset
                </Button>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header className="bg-success text-white">
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>
            Submitted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ProfileWizard;