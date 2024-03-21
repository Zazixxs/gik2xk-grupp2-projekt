// Product.jsx
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getProduct } from '../service/getService';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../service/cartService';
import Rating from './Rating'; // Import Rating component

function Product({ product: initialProduct }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = 1;

  useEffect(() => {
    getProduct(initialProduct.id)
      .then(product => {
        setProduct(product);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [initialProduct.id]);

  const handleAddToCart = async () => {
    try {
      await addProductToCart(userId, product.id, product.price);
      alert('Produkten har lagts till i varukorgen!');
    } catch (error) {
      alert('Något gick fel, försök igen.');
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data</p>;
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <div className="product">
        
        <Link to={`/product/${product.id}`}>
          <h2 style={{ marginBottom: '1rem' }}>{product.titel}</h2>
          <img src={product.imageUrl} alt={product.titel} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
          <p style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>{product.description}</p>
          <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{product.price} kr</p>
        </Link>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>Lägg till i varukorgen</Button>
      </div>
    </>
  );
}

export default Product;
