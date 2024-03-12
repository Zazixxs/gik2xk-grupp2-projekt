import { Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import Rating from "./Rating";


function Product({ product }) {
  const [rating, setRating] = useState(null); // Lägg till state för rating

  useEffect(() => {
    if (product && product.id) {
      // Hämta betygsinformation
      fetch(`http://localhost:5000/rating/${product.id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Rating from server:', data);
        setRating(data.rating);
      });
    }
  }, [product]);
  return (
    <><div style={{
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
      <h2 style={{ marginBottom: '1rem' }}>{product.titel}</h2>
      <img src={product.image} alt={product.titel} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
      <p style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>{product.description}</p>
      <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{product.price} kr</p>
    
    <Button>Lägg till i varukorg</Button>
    { rating && <Rating rating={rating} />}
    </div></>
  );
}

export default Product;
