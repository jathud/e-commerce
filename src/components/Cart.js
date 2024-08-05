import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Cart</h2>
      {cart.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <ul className="mt-4">
          {cart.map(product => (
            <li key={product.id} className="flex justify-between items-center p-2 border-b">
              <div>
                <h3 className="text-lg">{product.name}</h3>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
              </div>
              <button onClick={() => handleRemoveFromCart(product)} className="text-red-500">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
