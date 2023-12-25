// CartContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  let updatedState; // Declare updatedState once

  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If the item already exists, update its quantity
        updatedState = {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        // If the item is not in the cart, add it
        updatedState = { ...state, items: [...state.items, action.payload] };
      }
      break;

    case 'UPDATE_QUANTITY':
      updatedState = {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
      break;

    case 'REMOVE_FROM_CART':
      updatedState = {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
      break;

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }

  saveToLocalStorage(updatedState);
  return updatedState;
};

const saveToLocalStorage = (state) => {
  localStorage.setItem('cart', JSON.stringify(state));
};

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // Load cart from local storage when component mounts
    const savedCart = JSON.parse(localStorage.getItem('cart')) || initialState;
    dispatch({ type: 'LOAD_CART', payload: savedCart });
    console.log('Saved Cart:', savedCart);
  }, []);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
