const Client = require('../models/Client');

// GET /api/admin/clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    console.error('getAllClients error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/admin/clients
exports.createClient = async (req, res) => {
  try {
    const { name, designation, description, imageUrl } = req.body;

    if (!name || !designation || !description || !imageUrl) {
      return res.status(400).json({
        message: 'name, designation, description and imageUrl are required',
      });
    }

    const client = await Client.create({
      name,
      designation,
      description,
      imageUrl,
    });

    res.status(201).json(client);
  } catch (err) {
    console.error('createClient error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/admin/clients/:id
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, description, imageUrl, isActive } = req.body;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    if (name !== undefined) client.name = name;
    if (designation !== undefined) client.designation = designation;
    if (description !== undefined) client.description = description;
    if (imageUrl !== undefined) client.imageUrl = imageUrl;
    if (isActive !== undefined) client.isActive = isActive;

    await client.save();
    res.json(client);
  } catch (err) {
    console.error('updateClient error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/admin/clients/:id
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    console.error('deleteClient error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
