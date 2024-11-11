const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const router = express.Router();

const fetchAgents = async () => {
  try {
    const query = `
      SELECT name, icon, playable FROM agents;
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Erreur récup données agents:', error);
    throw error;
  }
};

router.get('/', async (req, res) => {
  try {
    const agents = await fetchAgents();
    res.json(agents);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
