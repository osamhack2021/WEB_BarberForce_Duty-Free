const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, default: null },
  name: { type: String, required: true },
  nickname: { type: String, required: true},
  phone: { type: String, required: true},
  soldier_id: { type: String, default: null },
  rank: { type: String, required: true},
  social: { type: Boolean, default: false },
});

userSchema.methods.comparePassword = function (plainPassword) {
  const hashed = crypto.createHash('sha512').update(plainPassword).digest('base64');
  return hashed === this.password;
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, 'secretToken', { expiresIn: '24h' });
};

module.exports = mongoose.model('User', userSchema);
