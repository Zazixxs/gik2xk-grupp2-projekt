const express = require('express');
const router = express.Router();
const db = require('../models');
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
        const user = await users.findByPk(userId);
        if (!user) {
            return res.status(404).send('Användare hittades inte');
        }
        const userCart = await cart.findOne({ where: { userId: user.id } });
        if (!userCart) {
            return res.status(404).send('Varukorg hittades inte');
        }
        const cartRows = await cart_row.findAll({ where: { cartId: userCart.id } });
        const productsInCart = [];
        for (let row of cartRows) {
            const product = await products.findByPk(row.productId);
            productsInCart.push(product);
        }
        res.status(200).json(productsInCart);
    } catch (error) {
        res.status(500).send('Ett fel uppstod när produkterna skulle hämtas från varukorgen');
    }
});

router.delete('/cart/:userId/:productId', async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const userCart = await cart.findOne({ where: { userId: userId } });
        if (!userCart) {
            return res.status(404).send('Varukorg hittades inte');
        }
        const rowToDelete = await cart_row.findOne({ where: { cartId: userCart.id, productId: productId } });
        if (!rowToDelete) {
            return res.status(404).send('Produkten hittades inte i varukorgen');
        }
        await rowToDelete.destroy();
        res.status(200).send('Produkten har tagits bort från varukorgen');
    } catch (error) {
        res.status(500).send('Ett fel uppstod när produkten skulle tas bort från varukorgen');
    }
});

router.put('/cart/updateProduct', async (req, res) => {
    const { userId, productId, amount } = req.body;
    try {
        const user = await users.findByPk(users.id);
        const product = await products.findByPk(product.id);
        if (!user || !product) {
            return res.status(404).send('Användare eller produkt hittades inte');
        }
        let userCart = await cart.findOne({ where: { userId: user.id } });
        if (!userCart) {
            return res.status(404).send('Varukorg hittades inte');
        }
        let cartRow = await cart_row.findOne({ where: { cartId: userCart.id, productId: product.id } });
        if (!cartRow) {
            return res.status(404).send('Produkten hittades inte i varukorgen');
        }
        cartRow.amount = amount;
        await cartRow.save();
        res.status(200).send('Produkten har uppdaterats i varukorgen');
    } catch (error) {
        res.status(500).send('Ett fel uppstod när produkten skulle uppdateras i varukorgen');
    }
});


module.exports = router;
