import React, { useEffect, useState } from 'react';
import { getAll } from '../service/getService'; // Byt ut 'yourFilePath' mot den faktiska sökvägen till din getAll funktion
import Product from '../components/Product'; 
import Rating from '../components/Rating'; // Importera Rating-komponenten

function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll('/api/products')
      .then(products => {
        setData(products);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

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
