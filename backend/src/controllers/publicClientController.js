const Client = require('../models/Client');

exports.getActiveClients = async (req, res) => {
  try {
    const clients = await Client.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    console.error('getActiveClients error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
