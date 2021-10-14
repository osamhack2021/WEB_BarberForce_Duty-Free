const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const bcrypt=require('bcrypt'); //PW 암호화

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: String,
  name: { type: String, required: true },
  soldier_id: { type: String, defaults: '' },
  token: { type: String, defaults: '' },
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  if (plainPassword == this.password) return cb(null, true);
  else return cb(null, false);
  /*
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
  */
};

userSchema.methods.generateToken = function (cb) {
  const user = this;
  const token = jwt.sign({ id: this._id }, 'secretToken', { expiresIn: '24h' });
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
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
