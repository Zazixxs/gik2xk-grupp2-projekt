import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import '../App.css';
import { getProduct } from '../service/getService';
import { useParams } from 'react-router-dom';
import AddRating from '../components/AddRating';
import { Rating } from '@material-ui/lab';
import RatingsList from '../components/RatingsList';

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then(product => {
        setProduct(product);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <>
    <div>
      {product && <Product key={product.id} product={product} />}
    </div>
    <AddRating productId={id} />
    <RatingsList id={id} />
    </>
  );
}

export default ProductView;
