import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart({ userId }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get(`/user/${userId}/getCart`);
      setCart(response.data);
    };

    fetchCart();
  }, [userId]);

  const addToCart = async (productId, amount) => {
    await axios.post('/cart/addProduct', { userId, productId, amount });
    const response = await axios.get(`/user/${userId}/getCart`);
    setCart(response.data);
  };

  return (
    <div>
      <h1>Varukorg</h1>
      {cart.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.price}</p>
          <button onClick={() => addToCart(item.id, 1)}>Lägg till i varukorgen</button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
