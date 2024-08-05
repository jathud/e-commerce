import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../store/cartSlice';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <div className="text-2xl font-bold text-green-600">
        <Link to="/">E-commerce</Link>
      </div>
      <div className="relative">
        <button 
          onClick={toggleDropdown} 
          className="flex items-center text-lg focus:outline-none"
        >
          Cart
          <svg
            className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded">
            {cart.length === 0 ? (
              <p className="p-2">Your cart is empty.</p>
            ) : (
              <>
                <ul className="list-none p-2 m-0">
                  {cart.map(product => (
                    <li key={product.id} className="flex justify-between items-center p-2 border-b">
                      <div>
                        <h3 className="text-sm">{product.name}</h3>
                        <p className="text-gray-600 text-xs">Quantity: {product.quantity}</p>
                      </div>
                      <button onClick={() => handleRemoveFromCart(product)} className="text-red-500 text-xs">Remove</button>
                    </li>
                  ))}
                </ul>
                <button className="item-center mt-2 bg-white text-black px-4 py-2 rounded hover:bg-green-600">Checkout</button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
