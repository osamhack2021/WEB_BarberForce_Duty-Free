const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.methods.comparePassword=function(plainPassword, cb){
  if(plainPassword==this.password)return cb(null,true);
  /*
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
  */
}

userSchema.methods.generateToken=function(cb){
    const user=this;
    const token=jwt.sign(user._id.toHexString(), 'secretToken');
    user.token=token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    });
}

module.exports = mongoose.model('User', userSchema);
