import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import { deleteProduct, updateProduct } from '../service/ProductService'; // Byt ut 'yourFilePath' mot den faktiska sökvägen till dina funktioner
import { getProduct } from '../service/getService';
import { useNavigate, Link } from "react-router-dom";
import '../App.css';


function ProductAdmin({ product: initialProduct }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      await deleteProduct(initialProduct.id);
      alert('Produkten har tagits bort.');
      window.location.reload();
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
          <h2>{product.titel}</h2>
          <img src={`/${product.imageUrl}.jpg`} alt={product.titel} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
          <p> {product.description}</p>
          <p>{product.price} kr</p>
        </Link>
        <Button style={{color:'red'}} onClick={handleDelete}>Ta bort</Button>
        <Button style={{color:'green'}} onClick={goToUpdateForm}>Updatera</Button>
      </div>
    </>
  );
}

export default ProductAdmin;
