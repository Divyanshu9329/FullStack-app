const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, maxlength: 1000 },
    imageUrl: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true }, // for landing page later
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
