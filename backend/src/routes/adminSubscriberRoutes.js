const express = require('express');
const { getAllSubscribers } = require('../controllers/adminSubscriberController');

const router = express.Router();

router.get('/', getAllSubscribers);

module.exports = router;
