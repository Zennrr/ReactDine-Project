// Cart.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Cart = () => {
  const { cartState, dispatch } = useCart();

  useEffect(() => {
    console.log('Cart State Updated:', cartState);
  }, [cartState]);

  const handleQuantityChange = (item, newQuantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: newQuantity } });
  };

  const handleRemoveItem = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: itemId } });
  };

  // Calculate the total cost of all items in the cart
  const calculateTotalCost = () => {
    const total = cartState.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // Round to two decimal places
    return total.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="total">Total: ${calculateTotalCost()}</div>
      <Link to="/" className="back-to-menu-button">
        Back to Menu
      </Link>
      <Link to="/checkout" className="checkout-button" disabled={cartState.items.length === 0}>
        Proceed to Checkout
      </Link>
      <div className="cart-items-container">
        {cartState.items.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={`http://localhost:5000/${item.image}`}
              alt={item.description}
            />
            <p>{item.name}</p>
            <label>
              Quantity:
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item, parseInt(e.target.value, 10))
                }
              />
            </label>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleRemoveItem(item.id)}>
              Remove Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
