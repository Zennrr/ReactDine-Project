import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    phoneNumber: '',
    specialInstructions: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear validation errors when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for phone number (only numbers allowed)
    const phoneNumberRegex = /^[0-9]+$/;

    if (!formData.phoneNumber.match(phoneNumberRegex)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: 'Please enter a valid phone number (only numbers allowed).',
      }));
      return;
    }

    // Additional validation for name, address, email, postal code, and city
    const requiredFields = ['name', 'address', 'email', 'postalCode', 'city'];

    const fieldErrors = requiredFields.reduce((acc, field) => {
      if (!formData[field].trim()) {
        acc[field] = `Please enter a valid ${field}.`;
      }
      return acc;
    }, {});

    if (Object.keys(fieldErrors).length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
      return;
    }

    // Handle form submission logic here
    onSubmit(formData);
  };

  return (
    <div className="checkout-container">
      <h2>Fill in your details</h2>
      <div className="checkout-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <p className="error-message">{errors.address}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
            {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            {errors.city && <p className="error-message">{errors.city}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
          </div>
          <button type="submit" className="place-order-button">Place Order</button>
        </form>
      </div>
      <Link to="/cart" className="back-to-cart-button">
        Back to Cart
      </Link>
    </div>
  );
};

export default CheckoutForm;
