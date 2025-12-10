const express = require('express');
const { getActiveClients } = require('../controllers/publicClientController');

const router = express.Router();

router.get('/', getActiveClients);

module.exports = router;
