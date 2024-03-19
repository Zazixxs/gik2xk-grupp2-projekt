import React from 'react';
import useFetch from '../useFetch';
import Product from '../components/Product'; 

function ProductList() {
  const { data, loading, error } = useFetch('http://localhost:5000/api/products');
  if (loading) {
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
        {Array.isArray(data) &&
          data.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    </>
  );
  
  
  
}

export default ProductList;
