import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductPage = ({ apiEndpoint }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${apiEndpoint}/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setSelectedColor(data.colors && data.colors.length > 0 ? data.colors[0] : ''); 
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [apiEndpoint, id]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (amount) => {
    if (quantity + amount > 0) {
      setQuantity(quantity + amount);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, color: selectedColor, quantity }));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row">
        <img src={product.image} alt={product.name} className="h-80 w-full md:w-1/2 object-cover rounded-lg" />
        <div className="md:ml-8 mt-4 md:mt-0 md:w-1/2">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <div className="mt-4">
            <h3 className="text-lg font-bold">Choose a Color:</h3>
            <div className="flex space-x-2 mt-2">
              {product.colors && product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full ${selectedColor === color ? 'border-2 border-black' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 bg-gray-200">-</button>
            <span className="mx-4">{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 bg-gray-200">+</button>
          </div>
          <p className="text-green-600 font-bold mt-4">${product.price.toFixed(2)}</p>
          <button onClick={handleAddToCart} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Add to Cart</button>
          <button className="mt-2 bg-gray-300 text-black px-4 py-2 rounded">Buy Now</button>
          <div className="mt-4">
            <h4 className="font-bold">Free delivery</h4>
            <p>Enter your postal code for delivery availability</p>
            <h4 className="font-bold mt-2">Return delivery</h4>
            <p>Free 30 days delivery returns. Details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
