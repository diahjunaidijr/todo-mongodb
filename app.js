// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('./config/mongoose');
const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todo.routes');
const authMiddleware = require('./middlewares/auth.middleware');  // Pastikan ini benar

const cors = require('cors');
const app = express();

// Middleware Cors
app.use(cors());

// Parsing body dalam format JSON
app.use(express.json());

// Rute yang tidak memerlukan otentikasi
app.use('/api/auth', authRoutes);

// Middleware otentikasi untuk rute-rute di bawahnya
app.use('/api/todos', authMiddleware.authenticateUser, todoRoutes);

// Tanggapan jika rute tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Tanggapan untuk kesalahan server
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Menjalankan server pada port tertentu
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
