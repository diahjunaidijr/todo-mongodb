const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Register User
router.post('/register', authController.registerUser);

// Login User
router.post('/login', authController.loginUser);

// Secure Route - Hanya dapat diakses jika memiliki token JWT yang valid
router.get('/secure', authenticateToken, authController.secureRoute);

module.exports = router;
