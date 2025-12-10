const Project = require('../models/Project');

// GET /api/projects
exports.getActiveProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('getActiveProjects error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
