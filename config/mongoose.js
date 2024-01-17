const mongoose = require('mongoose');

// URL MongoDB
const mongoURI = 'mongodb+srv://kelompok7:s5uEG9EDlC0TL1zj@cluster0.6bztawj.mongodb.net/Todos';

// Membuat koneksi ke MongoDB
mongoose.connect(mongoURI);

// Tangkap event koneksi berhasil
mongoose.connection.on('connected', () => {
  console.log('Terhubung ke MongoDB');
});

// Tangkap event error koneksi
mongoose.connection.on('error', (err) => {
  console.error('Koneksi MongoDB gagal:', err);
});

// Export objek koneksi Mongoose untuk digunakan di seluruh aplikasi
module.exports = mongoose.connection;
