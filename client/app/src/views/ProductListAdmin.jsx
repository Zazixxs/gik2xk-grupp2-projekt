import React from 'react';
import useFetch from '../useFetch';
import Navbar from '../components/Navbar';
import ProductAdmin from '../components/ProductAdmin'; // Importera Product-komponenten

function ProductListAdmin() {
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Ändra här för att justera bredden på korten
          gap: '20px',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
        }}
      >
        {Array.isArray(data) &&
          data.map((product) => (
            <ProductAdmin key={product.id} product={product} />
          ))}
      </div>
    </>
  );
  
  
  
}

export default ProductListAdmin;
