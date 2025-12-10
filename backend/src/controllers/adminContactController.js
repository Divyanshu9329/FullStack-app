const Contact = require('../models/Contact');

// GET /api/admin/contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('getAllContacts error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/admin/contacts
exports.createContact = async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;

    if (!fullName || !email || !mobile) {
      return res
        .status(400)
        .json({ message: 'fullName, email and mobile are required' });
    }

    const contact = await Contact.create({
      fullName,
      email,
      mobile,
      city,
    });

    res.status(201).json(contact);
  } catch (err) {
    console.error('createContact error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
