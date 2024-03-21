const express = require('express');
const router = express.Router();
const db = require('../models');
const Products = db.products;
const ratings = db.ratings;



//PRODUCTS 
router.get('/products', async (req, res, next) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    next(err); // Skicka felmeddelandet till Express för hantering
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



// POST route för att lägga till en produkt
router.post('/post', async (req, res) => {
  try {
    const { titel, description, price, imageUrl } = req.body;
    const now = new Date().toISOString();

    const product = await Products.create({
      titel: titel, // Ändra 'title' till 'titel'
      description,
      price,
      imageUrl,
      createdAt: now,
      updatedAt: now
    });

    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




// DELETE route för att ta bort en produkt
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.ratings.destroy({
      where: {
        product_id: id
      }
    });
    const product = await Products.destroy({ where: { id: id } });
    
    if (!product) {
      return res.status(404).send();
    }

    res.send({ message: 'Product deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverfel' });
  }
});

// UPDATE route för att uppdatera en produkt
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titel, description, price, imageUrl } = req.body;
    const now = new Date().toISOString();

    const product = await Products.update({
      titel,
      description,
      price,
      imageUrl,
      updatedAt: now
    }, {
      where: {
        id: id
      }
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json({ message: 'Product updated', product });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/ratings/:id', async (req, res) => {
  try {
    const Rating = await ratings.findAll({ where: { productId: req.params.id } });
    if (Rating && Rating.length > 0) {
      const sum = Rating.reduce((a, b) => a + b.rating, 0);
      const avg = sum / Rating.length;
      res.json({ averageRating: avg });
    } else {
      res.json({ message: 'Det finns inget betyg för denna produkt ännu.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while trying to fetch the rating' });
  }
});






router.post('/ratings', async (req, res) => {
  try {
    const rating = await Ratings.create(req.body);
    res.json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while trying to create a rating' });
  }
});

module.exports = router;
