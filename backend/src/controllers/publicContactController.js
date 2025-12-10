const Contact = require('../models/Contact');

const submitContact = async (req, res) => {
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

    return res
      .status(201)
      .json({ message: 'Contact submitted successfully', contact });
  } catch (err) {
    console.error('submitContact error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitContact };
