import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductPage from './components/ProductPage';
import './index.css';
const App = () => {
  const apiEndpoint = 'https://my-json-server.typicode.com/kodplex/pr-re-ec-products/db'; // Replace with your API endpoint

  return (
    <div className="bg-gray-100 min-h-screen">
      <Router>
        <Header />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<ProductList apiEndpoint={apiEndpoint} />} />
            <Route path="/product/:id" element={<ProductPage apiEndpoint={apiEndpoint} />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
