require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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
    } finally {
      pool.end();
    }
};

const fetchWeapons = async () => {
  try {
    const query = `
      SELECT name, icon, category FROM weapons;
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Erreur récup données armes:', error);
    throw error;
  } finally {
    pool.end();
  }
};

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
    } finally {
      pool.end();
    }
};

module.exports = { fetchWeapons, fetchGears, fetchAgents };