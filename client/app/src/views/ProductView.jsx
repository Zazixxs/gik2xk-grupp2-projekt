import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import '../App.css';


function ProductView (){
  const { id } = useParams();
  const [product, setProduct] = useState({});
  

  useEffect(() => {
    // Hämta produktinformation
    fetch(`http://localhost:5000/product/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Product from server:', data);
        setProduct(data);
      });
  }, [id]);

  return (    
    <div>
      { product && <Product key={product.id} product={product} />}
    </div> )
}

export default ProductView;
