const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10; // Sesuaikan dengan kebutuhan Anda

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Sesuaikan dengan kebutuhan Anda
  },
  
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log("Stored Password:", this.password);
  console.log("Candidate Password:", candidatePassword);

  // Trim candidatePassword
  const trimmedCandidatePassword = candidatePassword.trim();

  const isPasswordValid = await bcrypt.compare(trimmedCandidatePassword, this.password);

  console.log("Password comparison result:", isPasswordValid);

  return isPasswordValid;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
