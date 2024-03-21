const express = require('express');
const router = express.Router();
const db = require('../models');
const Cart = db.cart;
const CartRow = db.cartRow;
const User = db.users;
const { users, cart, cart_row, products } = require('../models');

router.post('/cart/addProduct', async (req, res) => {
    const { userId, productId, amount } = req.body;

    try {
        const user = await users.findByPk(userId);
        const product = await products.findByPk(productId);
        if (!user || !product) {
            return res.status(404).send('Användare eller produkt hittades inte');
        }
        let userCart = await cart.findOne({ where: { userId: user.id } });
        if (!userCart) {
            userCart = await cart.create({ userId: user.id, payed: false });
        }
        const newCartRow = await cart_row.create({
            cartId: userCart.id,
            productId: product.id,
            amount: amount
        });

        res.status(200).send('Produkten har lagts till i varukorgen');
    } catch (error) {
        res.status(500).send('Ett fel uppstod när produkten skulle läggas till i varukorgen');
    }
});

router.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Hämta användaren från databasen
        const user = await users.findByPk(userId);

        // Om användaren inte finns, skicka ett felmeddelande
        if (!user) {
            return res.status(404).send('Användare hittades inte');
        }

        // Hämta användarens varukorg
        const userCart = await cart.findOne({ where: { userId: user.id } });

        // Om användaren inte har en varukorg, skicka ett felmeddelande
        if (!userCart) {
            return res.status(404).send('Varukorg hittades inte');
        }

        // Hämta alla rader i varukorgen
        const cartRows = await cart_row.findAll({ where: { cartId: userCart.id } });

        // Skapa en array för att lagra produkterna i varukorgen
        const productsInCart = [];

        // Loopa igenom varje rad i varukorgen
        for (let row of cartRows) {
            // Hämta produkten för den aktuella raden
            const product = await products.findByPk(row.productId);

            // Lägg till produkten i arrayen
            productsInCart.push(product);
        }

        // Skicka produkterna i varukorgen till klienten
        res.status(200).json(productsInCart);
    } catch (error) {
        // Om något går fel, skicka ett felmeddelande till klienten
        res.status(500).send('Ett fel uppstod när produkterna skulle hämtas från varukorgen');
    }
});







module.exports = router;
