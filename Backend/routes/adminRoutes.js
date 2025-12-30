const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllUsers,
  getUser,
  activateUser,
  deactivateUser,
  deleteUser,
  getStats
} = require('../controllers/adminController');

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.put('/users/:id/activate', activateUser);
router.put('/users/:id/deactivate', deactivateUser);
router.delete('/users/:id', deleteUser);
router.get('/stats', getStats);

module.exports = router;
