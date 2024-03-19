import React, { useState, useEffect } from 'react';
import '../App.css';
import useMutate from '../useMutate';
import useFetch from '../useFetch';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

function UpdateForm() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useFetch(`http://localhost:5000/api/product/${id}`);
  const { mutate, isLoading: isMutating, isError: isMutateError } = useMutate({
    method: 'put',
    url: `http://localhost:5000/api/update/${id}`,
  });

  const [titel, setTitel] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (product) {
      setTitel(product.titel);
      setDescription(product.description);
      setPrice(product.price);
      setImageUrl(product.imageUrl);
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProduct = { 
      titel: titel,
      description, 
      price, 
      imageUrl
    };
  
    try {
      const data = await mutate(updatedProduct);
      console.log('Product updated:', data);
    } catch (error) {
      console.error('Error:', error);
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
    <div>
      <h2 style={{padding: "1.5rem"}}>Uppdate New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <label htmlFor="titel">Titel:</label>
        <input
          type="text"
          id="titel" 
          value={titel}
          onChange={(e) => setTitel(e.target.value)}
          required
          style={{ height: '2em', fontSize: '1.2em' }}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ height: '4em', fontSize: '1.2em' }}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ height: '2em', fontSize: '1.2em' }}
        />

        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          style={{ height: '2em', fontSize: '1.2em' }}
        />

        <Button type="submit" style={{ height: '2em', fontSize: '1.2em' }}>Update Product</Button>
      </form>
    </div>
  );
}

export default UpdateForm;
