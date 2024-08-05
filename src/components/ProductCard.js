import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-4 m-2 h-1/2 w-full ">
      <Link to={`/product/${product.id}`} className="flex flex-col items-center">
        <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-lg" />
        <h2 className="text-lg font-bold mt-2 text-center">{product.name}</h2>
        <p className="text-gray-600 text-center">{product.description}</p>
        <p className="text-green-600 font-bold mt-1 text-center">${product.price.toFixed(2)}</p>
      </Link>
      <button onClick={handleAddToCart} className="mt-2 bg-white text-black px-4 py-2 rounded hover:bg-green-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
