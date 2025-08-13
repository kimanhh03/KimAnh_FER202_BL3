import React, { useState } from 'react';

const RecipeRequestForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ingredient: "",
    maxPrepTime: "",
    notes: "",
  });

  const [showValidation, setShowValidation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowValidation(true);

    if (formData.name && formData.email && formData.ingredient && formData.maxPrepTime) {
      alert("Recipe request submitted successfully! 🎉\nWe'll review your request and get back to you soon.");
      setFormData({
        name: "",
        email: "",
        ingredient: "",
        maxPrepTime: "",
        notes: "",
      });
      setShowValidation(false);
      onClose();
    }
  };

  const isFieldValid = (fieldName) => {
    if (!showValidation) return true;
    return formData[fieldName].trim() !== "";
  };

  const isEmailValid = () => {
    if (!showValidation) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  return (
    <div 
      className="modal show d-flex align-items-center justify-content-center" 
      tabIndex="-1" 
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              📧 Recipe Request Form
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="alert alert-info mb-4" role="alert">
              <strong>💡 Tell us what you're craving!</strong><br/>
              Fill out this form and we'll create a custom recipe just for you.
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">
                  👤 Your Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${showValidation ? (isFieldValid("name") ? "is-valid" : "is-invalid") : ""}`}
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Please enter your name</div>
                <div className="valid-feedback">Looks good!</div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  📧 Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className={`form-control ${showValidation ? (isEmailValid() ? "is-valid" : "is-invalid") : ""}`}
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Please provide a valid email address</div>
                <div className="valid-feedback">Perfect! We'll send updates to this email.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="ingredient" className="form-label fw-bold">
                  🥕 Desired Ingredient <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${showValidation ? (isFieldValid("ingredient") ? "is-valid" : "is-invalid") : ""}`}
                  id="ingredient"
                  name="ingredient"
                  placeholder="e.g., chicken breast, salmon, quinoa, spinach, mushrooms, tofu, sweet potato..."
                  value={formData.ingredient}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Please specify your desired ingredient</div>
                <div className="valid-feedback">Great choice! We love working with that ingredient.</div>
                <div className="form-text">
                  💭 Tell us the main ingredient you'd like to see featured in your custom recipe
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="maxPrepTime" className="form-label fw-bold">
                  ⏱️ Maximum Prep Time <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${showValidation ? (isFieldValid("maxPrepTime") ? "is-valid" : "is-invalid") : ""}`}
                  id="maxPrepTime"
                  name="maxPrepTime"
                  value={formData.maxPrepTime}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">How much time do you have?</option>
                  <option value="5">⚡ 5 minutes (Super quick!)</option>
                  <option value="10">🏃‍♀️ 10 minutes (Fast & easy)</option>
                  <option value="15">👩‍🍳 15 minutes (Moderate prep)</option>
                  <option value="30">🧑‍🍳 30 minutes (I have time to cook)</option>
                </select>
                <div className="invalid-feedback">Please select your maximum prep time</div>
                <div className="valid-feedback">Perfect timing! We'll keep it within your schedule.</div>
              </div>

              <div className="mb-4">
                <label htmlFor="notes" className="form-label fw-bold">
                  📝 Additional Notes <small className="text-muted">(Optional)</small>
                </label>
                <textarea
                  className="form-control"
                  id="notes"
                  name="notes"
                  rows="4"
                  placeholder={`Any specific dietary requirements, allergies, cooking methods, or additional details you'd like to share? 
                  
Examples:
• Vegetarian/Vegan options
• Gluten-free requirements  
• Spice level preferences
• Cooking equipment limitations
• Family-friendly requests`}
                  value={formData.notes}
                  onChange={handleInputChange}
                ></textarea>
                <div className="form-text">
                  💬 Share any special requirements, preferences, or creative ideas you have in mind!
                </div>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  ✈️ Submit Request
                </button>
              </div>
            </form>
          </div>

          <div className="modal-footer bg-light">
            <div className="d-flex align-items-center w-100">
              <small className="text-muted me-auto">
                ℹ️ We'll review your request and try to create a recipe that matches your preferences!
              </small>
              <button className="btn btn-outline-secondary btn-sm" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeRequestForm;
