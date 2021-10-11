const mongoose = require('mongoose');

const barbersSchema = new mongoose.Schema({
  title: String,
  location: String,
  longitude: Number,
  latitude: Number,
  rating: Number,
  phone: String,
  thumb: String,
  bookmarked: Boolean,
  weekdayHour: String,
  holidayHour: String,
  description: String
});

module.exports = mongoose.model('Barbers', barbersSchema);
