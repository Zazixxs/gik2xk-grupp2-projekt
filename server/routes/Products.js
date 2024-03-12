const express = require('express');
const router = express.Router();

const db = require('../models');
const Products = db.products;



//PRODUCTS LISTING
router.get('/products', async (req, res) => {
    try {
      const products = await Products.findAll();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Serverfel' });
    }
});

//PRODUCT VIEW
router.get('/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findByPk(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: `Produkt ${id} hittades inte` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverfel' });
  }
});

const { Op } = require('sequelize');


router.get('/rating/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const ratings = await db.ratings.findAll({
      where: {
        productId: id
      }
    });

    if (ratings && ratings.length > 0) {
      const sum = ratings.reduce((a, b) => a + b.ratings, 0);
      const avg = sum / ratings.length;
      res.json({ rating: avg });
    } else {
      res.status(404).json({ message: `Inga betyg hittades för produkt ${id}` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverfel' });
  }
});





//PRODUCT DELETE
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findByPk(id);
    if (product) {
      await product.destroy();
      res.json({ message: `Produkt ${id} raderad` });
    } else {
      res.status(404).json({ message: `Produkt ${id} hittades inte` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverfel' });
  }
});

module.exports = router;
