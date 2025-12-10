const express = require('express');
const { getActiveProjects } = require('../controllers/publicProjectController');

const router = express.Router();

router.get('/', getActiveProjects);

module.exports = router;
