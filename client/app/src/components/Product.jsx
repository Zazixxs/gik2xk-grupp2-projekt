import { Button } from "@mui/material";
import React, { useState } from "react";
import Rating from "../components/Rating";
import useFetch from '../useFetch';
import useMutate from '../useMutate'; // Importera useMutate
import { Link } from 'react-router-dom';

function Product({  product: initialProduct }) {
  const { data: product, isLoading, isError } = useFetch(`http://localhost:5000/api/product/${initialProduct.id}`);
  const addToCart = useMutate({ method: 'POST', url: 'http://localhost:5000/api/cart' }); // Använd useMutate

  const handleAddToCart = async () => {
    try {
      await addToCart.mutate({
        productId: product.id,
        // Du behöver också skicka userId här, antingen från en inloggad användares session eller någon annan identifierare
        userId: 'yourUserId',
        amount: 1,
      });
      alert('Produkten har lagts till i varukorgen!');
    } catch (error) {
      alert('Något gick fel, försök igen.');
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <div style={{
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        color: 'black'
      }}>
        <Link to={`/product/${product.id}`}>
          <h2 style={{ marginBottom: '1rem' }}>{product.titel}</h2>
          <img src={product.imageUrl} alt={product.titel} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
          <p style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>{product.description}</p>
          <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{product.price} kr</p>
        </Link>
        <Button onClick={handleAddToCart}>Lägg till i varukorg</Button> {/* Använd handleAddToCart */}
        <Rating id={initialProduct.id} />
      </div>
    </>
  );
}

export default Product;
