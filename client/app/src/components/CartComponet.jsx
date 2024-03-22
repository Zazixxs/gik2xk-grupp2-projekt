import React, { useState, useEffect } from 'react';
import { getCart, addToCart, removeFromCart } from '../service/cartService';
import '../App.css';

function CartComponent({ userId }) {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // HÄR KAN MAN STÄLLA IN VILKE USER SOM SKA HA TILLGÅNG TILL VARUKORGEN
    userId = 2;

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        const cart = await getCart(userId);
        if (cart && cart.products) {
            setCartItems(cart.products);
            setTotalPrice(cart.total);
        }
    };

    return (
        <div className='cart'>
            <h2>Varukorg</h2>
            <p>{cartItems.length} produkter i varukorgen</p>
            <p>Totalt pris: {totalPrice}</p>
            {cartItems.map((item) => (
                <div key={item.id}>
                    <p>Produkt ID: {item.titel}</p>
                   <button onClick={async () => {
                    const updatedCart = await removeFromCart(userId, item.id);
                     if (updatedCart && updatedCart.products) {
                        setCartItems(updatedCart.products);
                        setTotalPrice(updatedCart.total);
                     }
                     }}>Ta bort produkt</button>
                </div>
            ))}
        </div>
    );
}

export default CartComponent;
