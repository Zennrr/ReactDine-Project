import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutForm from './CheckoutForm';
import OrderSummary from './OrderSummary';
import './CheckoutPage.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from './CartContext';

const CheckoutPage = () => {
  const { cartState } = useCart();

  const handleCheckout = async (formData) => {
    // Simple validation for phone number (only numbers allowed)
    const phoneNumberRegex = /^[0-9]+$/;

    if (!formData.phoneNumber.match(phoneNumberRegex)) {
      // Show error notification for invalid phone number
      toast.error('Order not sent, invalid phone number. Please enter a valid phone number (only numbers allowed).', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Additional validation for name and address
    if (!formData.name.trim() || !formData.address.trim()) {
      // Show error notification for missing name or address
      toast.error('Order not sent, invalid name or address. Please fill in all required fields.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Create an order object matching backend API's format
    const order = {
      order: {
        customer: {
          name: formData.name,
          email: formData.email,
          street: formData.address,
          'postal-code': formData.postalCode,
          city: formData.city,
        },
        items: cartState.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      },
    };

    try {
      // Send a POST request to backend API
      const response = await axios.post('http://localhost:5000/api/orders', order);

      // Check if the order was successfully created
      if (response.status >= 200 && response.status < 300) {
        // Show success notification
        toast.success('Order placed successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // Show error notification for unsuccessful order creation
        console.log('buh2');
        toast.error('Order could not be sent. Please try again later.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error('Error creating order:', error);
      console.log('buh');
      // Show error notification
      toast.error('Order could not be sent. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <OrderSummary />
      <CheckoutForm onSubmit={handleCheckout} />
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
