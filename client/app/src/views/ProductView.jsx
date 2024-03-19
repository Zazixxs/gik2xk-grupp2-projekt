import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import '../App.css';
import useFetch from '../useFetch';
import { useParams } from 'react-router-dom';

function ProductView({  }) {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`http://localhost:5000/api/product/${id}`);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data</p>;
  }

  return (
    <div>
      {data && <Product key={data.id} product={data} />}
    </div>
  );
}

export default ProductView;
