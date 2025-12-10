const express = require('express');
const {
  getAllContacts,
  createContact,
} = require('../controllers/adminContactController');

const router = express.Router();

router.get('/', getAllContacts);
router.post('/', createContact); // 👈 ADD THIS

module.exports = router;
