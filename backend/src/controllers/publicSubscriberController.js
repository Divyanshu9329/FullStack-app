const Subscriber = require('../models/Subscriber');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: 'Already subscribed' });
    }

    await Subscriber.create({ email });
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    console.error('subscribe error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
