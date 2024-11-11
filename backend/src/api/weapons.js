const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const router = express.Router();

const fetchWeapons = async () => {
  try {
    const query = `
      SELECT name, icon, category, cost FROM weapons;
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Erreur récup données armes:', error);
    throw error;
  }
};

router.get('/', async (req, res) => {
  try {
    const weapons = await fetchWeapons();
    res.json(weapons);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
