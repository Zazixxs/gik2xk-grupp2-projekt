import React, { useEffect, useState } from 'react';
import '../App.css';
import ProductAdmin from '../components/ProductAdmin'; 
import { getAll } from '../service/getService';

function ProductListAdmin() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll('/api/products')
      .then(products => {
        setProducts(products);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
        }}
      >
        {Array.isArray(products) &&
          products.map((product) => (
            <ProductAdmin key={product.id} product={product} />
          ))}
      </div>
    </>
  );
}

export default ProductListAdmin;
