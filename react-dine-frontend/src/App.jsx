// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Update import
import Menu from './Menu';
import CartPage from './CartPage';
import { CartProvider } from './CartContext';
import CheckoutPage from './CheckoutPage';
import './App.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="container">
          <h1>React Diner</h1>
          <div className="menu-container">
            <Routes> {}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/" element={<Menu />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </div>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
