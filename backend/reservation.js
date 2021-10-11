const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  year: Number,
  month: Number,
  date: Number,
  time: Number,
  barbers_id: String, //ObjectId
  user_id: String,    //ObjectId
  description: String
});



module.exports = mongoose.model('Reservation', reservationSchema);
