const express = require('express');
const router = express.Router();
const db = require('../models');
const app = require('../app');
const Products = db.products;
const Rating = db.Rating;



//PRODUCTS LISTING
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




router.get('/rating/:productId', async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByPk(productId);
  if (product) {
    res.json({ averageRating: product.averageRating });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});


router.post('/rating/post/:productId', async (req, res) => {
  // Hämta productId och ratings från req.params och req.body
  const { productId } = req.params;
  const { ratings } = req.body;

  // Skapa ett nytt betyg i ratings-tabellen
  const newRating = await Rating.create({
    productId: productId,
    ratings: ratings,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Hantera fel och svara klienten
  if (newRating) {
    res.status(201).json({ message: 'Betyg skapat!', newRating });
  } else {
    res.status(500).json({ message: 'Något gick fel, försök igen.' });
  }
});

module.exports = router;
