import React, { useState } from 'react';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', age: '' });

  const validateForm = () => {
    const newErrors = { name: '', email: '', age: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    if (!age) {
      newErrors.age = 'Age is required';
      isValid = false;
    } else if (parseInt(age) < 1) {
      newErrors.age = 'Age must be at least 1';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setErrors({ name: '', email: '', age: '' });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      console.log('Profile submitted:', { name, email, age });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    if (errors.age) setErrors((prev) => ({ ...prev, age: '' }));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">Profile Form</h3>
            </div>

            <div className="card-body p-4">
              {showToast && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>Success!</strong> Profile submitted successfully!
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowToast(false)}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : name ? 'is-valid' : ''}`}
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : email.includes('@') && email ? 'is-valid' : ''}`}
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-4">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    className={`form-control ${errors.age ? 'is-invalid' : age && parseInt(age) >= 1 ? 'is-valid' : ''}`}
                    id="age"
                    placeholder="Enter your age"
                    value={age}
                    onChange={handleAgeChange}
                    min="1"
                    max="120"
                  />
                  {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Submit
                  </button>
                </div>
              </form>

              {(name || email || age) && (
                <div className="mt-4">
                  <div className="card bg-light">
                    <div className="card-header">
                      <h6 className="mb-0 text-muted">Current Data</h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4">
                          <small className="text-muted">Name:</small>
                          <div className="fw-bold">{name || 'Not entered'}</div>
                        </div>
                        <div className="col-4">
                          <small className="text-muted">Email:</small>
                          <div className="fw-bold">{email || 'Not entered'}</div>
                        </div>
                        <div className="col-4">
                          <small className="text-muted">Age:</small>
                          <div className="fw-bold">{age || 'Not entered'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
