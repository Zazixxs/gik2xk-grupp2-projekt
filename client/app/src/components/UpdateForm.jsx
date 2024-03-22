import React, { useState, useEffect } from 'react';
import '../App.css';
import {updateProduct } from '../service/ProductService';
import { getProduct } from '../service/getService'; 
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

function UpdateForm() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [titel, setTitel] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    getProduct(id)
      .then(product => {
        setProduct(product);
        setIsLoading(false);
        if (product) {
          setTitel(product.titel);
          setDescription(product.description);
          setPrice(product.price);
          setImageUrl(product.imageUrl);
        }
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProduct = { 
      titel: titel,
      description, 
      price, 
      imageUrl
    };
  
    try {
      const data = await updateProduct(id, updatedProduct);
      console.log('Product updated:', data);
    } catch (error) {
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
    <div>
      <h2 style={{padding: "1.5rem"}}>Update New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <label htmlFor="titel">Titel:</label>
        <input
          type="text"
          id="titel" 
          value={titel}
          onChange={(e) => setTitel(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <Button type="submit">Update Product</Button>
      </form>
    </div>
  );
}

export default UpdateForm;
