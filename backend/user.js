const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  data: Object,
});
module.exports = mongoose.model('User', userSchema);
