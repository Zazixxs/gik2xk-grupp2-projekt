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

/*router.post("/:id", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.put("/:id", async (req, res) => {
  await User.update(req.body, { where: { id: req.params.id } });
  res.status(204).send();
});

router.delete("/:id", async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});
//*/

module.exports = router;