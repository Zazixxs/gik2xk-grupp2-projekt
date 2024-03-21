import React, { useState } from 'react';
import '../App.css';
import { createProduct } from '../service/PostService'; // Byt ut 'yourFilePath' mot den faktiska sökvägen till din createProduct funktion
import { Button } from '@mui/material';

function AddForm() {
  const [titel, setTitel] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const product = { 
      titel: titel,
      description, 
      price, 
      imageUrl
    };
  
    try {
      const data = await createProduct(product);
      console.log('Product created:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  
    setTitel('');
    setDescription('');
    setPrice('');
    setImageUrl('');
  };
  

  return (
    <div>
      <h2 style={{padding: "1.5rem"}}>Add New Product</h2>
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

        <Button type="submit" style={{ height: '2em', fontSize: '1.2em' }}>Add Product</Button>
      </form>
    </div>
  );
}

export default AddForm;
