const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const bcrypt=require('bcrypt'); //PW 암호화

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: String,
  name: { type: String, required: true },
  soldier_id: { type: String, defaults: '' },
});

userSchema.methods.comparePassword = function (plainPassword) {
  // 소셜로그인 사용자면 이메일로 로그인 못하도록
  if (password === null) {
    return false;
  }

  return plainPassword === this.password;
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, 'secretToken', { expiresIn: '24h' });
};

userSchema.method.insertUser = function (cb, email, name) {
  const user = this;
  user.insertMany({ email: email, name: name, password: null, token: '' });
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.method.saveUser = function (cb) {
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

module.exports = mongoose.model('User', userSchema);
