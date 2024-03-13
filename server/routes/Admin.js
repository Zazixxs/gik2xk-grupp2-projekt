const express = require('express');
const router = express.Router();

const db = require('../models');
const Products = db.products;


//ADMIN PRODUCTS LISTING

router.get('/admin', async (req, res) => {
    try {
      const products = await Products.findAll();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Serverfel' });
    }
}); 

router.post('/admin/post', async (req, res) => {
    try {
      const product = await Products.create({
        titel: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image_url: req.body.image
      });
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Serverfel' });
    }
});
