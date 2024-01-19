// auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Contoh pemanggilan Route.post() untuk endpoint register
router.post('/register', authController.registerUser);

// Contoh pemanggilan Route.post() untuk endpoint login
router.post('/login', authController.loginUser);

module.exports = router;
