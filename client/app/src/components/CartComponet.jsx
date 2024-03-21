import React, { useState, useEffect } from 'react';
import { getCart, addToCart, removeFromCart } from '../service/cartService';
import '../App.css';

function CartComponent({ userId }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        const cart = await getCart(userId);
        if (cart) {
            setCartItems(cart);
        }
    };

    return (
        <div className='cart'>
            <h2>Varukorg</h2>
            <p>{cartItems.length} produkter i varukorgen</p>
            {cartItems.map((item) => ( 
                console.log(item.id),
                <div key={item.id}>
                    <p>Produkt ID: {item.titel}</p>
                   <button onClick={async () => {
                    const updatedCart = await removeFromCart(userId, item.id);
                    console.log(item.id);
                     setCartItems(updatedCart);
                     }}>Ta bort produkt</button>
                </div>
            ))}
        </div>
    );
}

export default CartComponent;
