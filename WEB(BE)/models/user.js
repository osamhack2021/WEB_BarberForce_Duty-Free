const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, default: null },
  name: { type: String, required: true },
  soldier_id: { type: String, required: true },
  social: { type: Boolean, default: false },
});

userSchema.methods.comparePassword = function (plainPassword) {
  // 소셜로그인 사용자면 이메일로 로그인 못하도록
  if (this.password === null) {
    return false;
  }

  const hashed = crypto.createHash('sha512').update(plainPassword).digest('base64');
  return hashed === this.password;
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, 'secretToken', { expiresIn: '24h' });
};

module.exports = mongoose.model('User', userSchema);
