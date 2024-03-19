const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

// Antag att du har en User-modell definierad med Sequelize
const { User } = require('./models');

router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ error: 'Användarnamn eller lösenord är felaktigt' });
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(401).json({ error: 'Användarnamn eller lösenord är felaktigt' });
  }

  const token = jwt.sign({ userId: user.id }, 'your-secret-key');
  res.json({ token });
});

module.exports = router;
