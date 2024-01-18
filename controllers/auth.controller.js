const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const { SECRET_KEY } = process.env;

// Penanganan Kesalahan Registrasi
const handleRegistrationError = (res, error) => {
  console.error('Error during registration:', error);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Penanganan Kesalahan Login
const handleLoginError = (res, error) => {
  console.error('Error during login:', error);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cek apakah username sudah ada di database
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: 'Username sudah digunakan' });
    }

    // Generate salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user dengan password yang sudah di-hash
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    handleRegistrationError(res, error);
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Login attempt with username:", username);

    // Temukan pengguna berdasarkan username di database
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    console.log("Password to compare:", password);
    console.log("Stored Hashed Password:", user.password);
    
    // Bandingkan password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("Password comparison result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Hasilkan token JWT
    const token = jwt.sign({ user: { id: user._id, username: user.username } }, SECRET_KEY);

    // Cek nilai SECRET_KEY sebelum menggunakan jwt.sign
    console.log("SECRET_KEY value:", process.env.SECRET_KEY);

    res.status(200).json({ token });
  } catch (error) {
    handleLoginError(res, error);
  }
};

const secureRoute = (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
};

module.exports = { registerUser, loginUser, secureRoute };