const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { fetchAgents, fetchWeapons, fetchGears } = require('./dataFetcher');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/agents', async (req, res) => {
  try {
    const agents = await fetchAgents();
    res.json(agents);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

app.get('/weapons', async (req, res) => {
    try {
      const weapons = await fetchWeapons();
      res.json(weapons);
    } catch (error) {
      res.status(500).send('Erreur serveur');
    }
  });

  app.get('/gears', async (req, res) => {
    try {
      const gears = await fetchGears();
      res.json(gears);
    } catch (error) {
      res.status(500).send('Erreur serveur');
    }
  });
  
module.exports = app;
