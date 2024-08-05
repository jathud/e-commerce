import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ apiEndpoint }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiEndpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Assuming the structure of the response matches the given sample
        setProducts(data.ecommerce.products);
      })
      .catch(error => setError(error.message));
  }, [apiEndpoint]);

  if (error) {
    return <div className="text-red-500">Error loading products: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
