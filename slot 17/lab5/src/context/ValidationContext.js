import React, { createContext, useContext } from "react";

const ValidationContext = createContext();

export const ValidationProvider = ({ children }) => {
  // 🔹 Login validation
  const validateLogin = (formData) => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  // 🔹 Register validation
  const validateRegister = (formData) => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      errors.phone = "Phone number must be at least 10 digits";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.agreeTerms)
      errors.agreeTerms = "You must agree to the terms and conditions";

    return errors;
  };

  // 🔹 Checkout validation
  const validateCheckout = (formData) => {
    const errors = {};
    // Billing
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.zipCode.trim()) errors.zipCode = "ZIP code is required";

    // Payment
    if (!formData.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      errors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.expiryDate.trim()) {
      errors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      errors.expiryDate = "Invalid format (MM/YY)";
    }

    if (!formData.cvv.trim()) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      errors.cvv = "CVV must be 3-4 digits";
    }

    if (!formData.nameOnCard.trim())
      errors.nameOnCard = "Name on card is required";

    return errors;
  };

  return (
    <ValidationContext.Provider
      value={{ validateLogin, validateRegister, validateCheckout }}
    >
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidation = () => useContext(ValidationContext);
