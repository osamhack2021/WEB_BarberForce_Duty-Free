const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String, default: null },
  name: { type: String },
  nickname: { type: String },
  phone: { type: String },
  soldier_id: { type: String, default: null },
  rank: { type: String },
  social: { type: Boolean, default: false },
});

userSchema.methods.comparePassword = function (plainPassword) {
  const hashed = crypto.createHash('sha512').update(plainPassword).digest('base64');
  return hashed === this.password;
};

userSchema.methods.generateToken = function () {
  //env.process.dddd맞음 이거 그러면 여기랑  jwt verify 하는 부분도 넣어줘야함
  return jwt.sign({ _id: this._id }, process.env.SECRETTOKEN, { expiresIn: '24h' });
};

module.exports = mongoose.model('User', userSchema);
