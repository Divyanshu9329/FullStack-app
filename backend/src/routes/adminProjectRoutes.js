const express = require('express');
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/adminProjectController');

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
