const { User, Cart, Product } = require('../models');
const express = require('express');
const router = express.Router();
const db = require('../models');


router.get("/:id/getCart", async (req, res) => {
  const cart = await Cart.findOne({ 
    where: { userId: req.params.id },
    include: {
      model: Product,
      through: { attributes: ['amount'] }
    }
  });
  res.json(cart);
});



module.exports = router;