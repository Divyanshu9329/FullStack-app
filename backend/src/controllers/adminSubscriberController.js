const Subscriber = require('../models/Subscriber');

// GET /api/admin/subscribers
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    console.error('getAllSubscribers error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
