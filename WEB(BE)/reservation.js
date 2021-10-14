const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  year: Number,
  month: Number,
  day: Number,
  time: String,
  barbers_id: String, //ObjectId
  user_id: String,    //ObjectId
  userName: String,
  description: String
});



module.exports = mongoose.model('Reservation', reservationSchema);
