const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const router = express.Router();

const fetchGears = async () => {
  try {
    const query = `
      SELECT name, icon, category FROM gears;
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Erreur récup données armures:', error);
    throw error;
  }
};

router.get('/', async (req, res) => {
  try {
    const gears = await fetchGears();
    res.json(gears);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;