const mongoose = require('mongoose');

const barbersSchema = new mongoose.Schema({
  title: String,
  location: String,
  location_detail: String,
  rating: Number,
  phone: String,
  thumb: String,
  bookmarked: Boolean,
  weekdayHour: String,
  holidayHour: String,
  description: String,
  partnership: [String]
});

module.exports = mongoose.model('Barbers', barbersSchema);
