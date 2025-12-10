const express = require('express');
const {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/adminClientController');

const router = express.Router();

router.get('/', getAllClients);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
