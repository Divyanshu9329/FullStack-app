const Project = require('../models/Project');

// GET /api/admin/projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('getAllProjects error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/admin/projects
exports.createProject = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    if (!name || !description || !imageUrl) {
      return res
        .status(400)
        .json({ message: 'name, description and imageUrl are required' });
    }

    const project = await Project.create({ name, description, imageUrl });
    res.status(201).json(project);
  } catch (err) {
    console.error('createProject error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/admin/projects/:id
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl, isActive } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (name !== undefined) project.name = name;
    if (description !== undefined) project.description = description;
    if (imageUrl !== undefined) project.imageUrl = imageUrl;
    if (isActive !== undefined) project.isActive = isActive;

    await project.save();
    res.json(project);
  } catch (err) {
    console.error('updateProject error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/admin/projects/:id
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('deleteProject error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
