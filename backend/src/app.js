const express = require('express');
const cors = require('cors');

const app = express();
const api = require('./api');
app.use(cors());
app.use(express.json());

app.use('/api', api);
module.exports = app;
