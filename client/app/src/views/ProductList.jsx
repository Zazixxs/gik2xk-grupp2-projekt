import React, { useEffect, useState } from 'react';
import ProductCard from "../components/ProductCard";
import '../App.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          console.log('Products from server:', data);
          setProducts(data);
        } else {
          console.error('Data from server is not an array:', data);
        }
      });
  }, []);
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '10px', 
      justifyContent: 'center',
      padding: '1rem'
    }}>
      {Array.isArray(products) && products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
