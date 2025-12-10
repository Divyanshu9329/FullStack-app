const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true },
    mobile: { type: String, required: true, trim: true, minlength: 8, maxlength: 20 },
    city: { type: String, required: true, trim: true, maxlength: 100 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model('Contact', contactSchema);
