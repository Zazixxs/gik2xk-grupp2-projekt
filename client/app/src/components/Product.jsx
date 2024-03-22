import React, { useState, useEffect } from 'react';
import { getProduct, getAllRatings } from '../service/getService';
import { addProductToCart } from '../service/cartService';
import Rating from './Rating';
import { Button } from "@mui/material";
import { Link,useLocation} from 'react-router-dom';
import '../App.css';

function Product({ product: initialProduct }) {
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //Här ändrar vi också user för att testa att lägga till produkter i varukorgen
  const userId = 2;
 
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getProduct(initialProduct.id);
        const ratings = await getAllRatings(initialProduct.id);
        if (ratings && ratings.length > 0) {
          const sum = ratings.reduce((a, b) => a + b.rating, 0);
          const avg = sum / ratings.length;
          setRating(avg);
        }
        setProduct(product);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchData();
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
          <h2>{product.titel}</h2>
          <img src={`/${product.imageUrl}.jpg`} alt={product.titel} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
          {location.pathname === `/product/${product.id}` && <p>{product.description}</p>}
          <p>{product.price} kr</p>
        </Link>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>Lägg till i varukorgen</Button>
        <Rating id={initialProduct.id} />
      </div>
    </>
  );
}

export default Product;
