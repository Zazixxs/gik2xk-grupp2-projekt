import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import useFetch from "../useFetch";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import useMutate from "../useMutate";
import { useNavigate } from "react-router-dom";


function ProductAdmin({  product: initialProduct }) {
  const { data: product, isLoading, isError } = useFetch(`http://localhost:5000/api/product/${initialProduct.id}`);
  const { mutate: deleteProduct } = useMutate({ method: 'delete', url: `http://localhost:5000/api/delete/${initialProduct.id}` });
  const { mutate: updateProduct } = useMutate({ method: 'put', url: `http://localhost:5000/api/update/${initialProduct.id}` });
  const navigate = useNavigate();



  const handleDelete = async () => {
    try {
      await deleteProduct({ id: initialProduct.id });
      alert('Produkten har tagits bort.');
      window.location.reload(); // Ladda om sidan
    } catch (error) {
      console.error(error);
      alert('Ett fel uppstod när produkten skulle tas bort.');
    }
  };
  
  const goToUpdateForm = () => {
    navigate(`/update/${initialProduct.id}`);
}
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
        <Button style={{color:'red'}} onClick={ handleDelete}>Ta bort</Button>
        <Button style={{color:'green'}} onClick={goToUpdateForm}>Updatera</Button>
      </div>
    </>
  );
}

export default ProductAdmin;
