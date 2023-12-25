// OrderSummary.jsx
import React from 'react';
import { useCart } from './CartContext';

const OrderSummary = () => {
  const { cartState } = useCart();

  // Calculate the total cost of all items in the cart
  const calculateTotalCost = () => {
    const total = cartState.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // Round to two decimal places
    return total.toFixed(2);
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <ul>
        {cartState.items.map((item) => (
          <li key={item.id}>
            {item.name}: ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <div className="total">Total: ${calculateTotalCost()}</div>
    </div>
  );
};

export default OrderSummary;
