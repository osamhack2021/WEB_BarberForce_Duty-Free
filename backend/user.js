const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
//const bcrypt=require('bcrypt'); //PW 암호화

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  passowrd_confirm: String,
  name: String,
  soldier_id: String,
  token: String
});

userSchema.methods.comparePassword=function(plainPassword, cb){
  if(plainPassword==this.password)return cb(null,true);
  else return cb(null,false);
  /*
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
  */
}

userSchema.methods.generateToken=function(cb){
    const user=this;
    const token = jwt.sign({id:this._id},"secretToken",{ expiresIn: '30m'});
    user.token=token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    });
}

module.exports = mongoose.model('User', userSchema);
