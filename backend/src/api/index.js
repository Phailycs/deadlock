const express = require('express');

const emojis = require('./emojis');
const agents = require('./agents');
const gears = require('./gears');
const weapons = require('./weapons');

const router = express.Router();

router.use('/emojis', emojis);
router.use('/agents', agents);
router.use('/gears', gears);
router.use('/weapons', weapons);


module.exports = router;