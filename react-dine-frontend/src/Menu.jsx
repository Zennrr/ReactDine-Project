import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { cartState, dispatch } = useCart();
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dishes');
        const data = await response.json();
        setMenuItems(data);
        console.log('Fetched Menu Items:', data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const addToCart = (item) => {
    const quantity = itemQuantities[item.id] || 1;
    const existingItem = cartState.items.find((i) => i.id === item.id);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + quantity;
      console.log('Updating quantity for existing item:', updatedQuantity);
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: updatedQuantity } });
    } else {
      console.log('Adding new item to the cart:', item);
      dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } });
    }
  };

  return (
    <div className="menu-container">
      {menuItems.map((item) => (
        <div key={item.id} className="menu-item">
          <img src={`http://localhost:5000/${item.image}`} alt={item.description} />
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <label>
            Quantity:
            <input
              type="number"
              value={itemQuantities[item.id] || 1}
              onChange={(e) => setItemQuantities((prevQuantities) => ({
                ...prevQuantities,
                [item.id]: parseInt(e.target.value, 10),
              }))}
            />
          </label>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}
      <Link to="/cart" className="go-to-cart-button">Go to Cart</Link>
    </div>
  );
};

export default Menu;
