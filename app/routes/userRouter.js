const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { JWT_SECRET } = process.env;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Missing authorization header' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [
      decoded.id,
    ]);
    const user = rows[0];
    res.json({ user });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
});

module.exports = router;

