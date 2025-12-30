const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  signupValidation, 
  loginValidation,
  validate 
} = require('../middleware/validator');
const {
  signup,
  login,
  getMe,
  logout
} = require('../controllers/authController');

// Public routes
router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;
