const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  updateProfileValidation,
  changePasswordValidation,
  validate 
} = require('../middleware/validator');
const {
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/userController');

// All routes are protected
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfileValidation, validate, updateProfile);
router.put('/password', changePasswordValidation, validate, changePassword);

module.exports = router;
