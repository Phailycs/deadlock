const express = require('express');
const cors = require('cors');
const { fetchAgents, fetchWeapons, fetchGears } = require('./dataFetcher');

const app = express();
app.use(cors());
app.use(express.json());

// Route pour récupérer les agents
app.get('/api/agents', async (req, res) => {
  try {
    const agents = await fetchAgents();
    res.json(agents);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// Route pour récupérer les armes
app.get('/api/weapons', async (req, res) => {
  try {
    const weapons = await fetchWeapons();
    res.json(weapons);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// Route pour récupérer les armures
app.get('/api/gears', async (req, res) => {
  try {
    const gears = await fetchGears();
    res.json(gears);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur sur ${PORT}`);
});
