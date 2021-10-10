const mongoose = require('mongoose');

const barbersSchema = new mongoose.Schema({
  id: Number, //임
  name: String,
  location: String,
  longitude: Number,
  latitude: Number,
  rating: Number,
  bookmarked: Boolean
});



module.exports = mongoose.model('Barbers', barbersSchema);
