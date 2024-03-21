import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCart } from '../service/cartService';
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

    const addToCart = async (productId, amount = 1) => {
        try {
            await axios.post(`/api/${userId}/addProduct`, { productId, amount });
            fetchCartItems();
        } catch (error) {
            console.error('Ett fel uppstod när produkten skulle läggas till i varukorgen', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.post(`/api/${userId}/removeProduct`, { productId });
            fetchCartItems();
        } catch (error) {
            console.error('Ett fel uppstod när produkten skulle tas bort från varukorgen', error);
        }
    };

    return (
        <div className='cart'>
            <h2>Varukorg</h2>
            <p>{cartItems.length} produkter i varukorgen</p>
            {cartItems.map((item) => (
                <div key={item.id}>
                    <p>Produkt ID: {item.titel}</p>
                    <button onClick={() => addToCart(item.id)}>Lägg till mer</button>
                    <button onClick={() => removeFromCart(item.id)}>Ta bort produkt</button>
                </div>
            ))}
        </div>
    );
}

export default CartComponent;
