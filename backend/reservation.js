const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  year: Number,
  month: Number,
  date: Number,
  time: Number,
  barbers_id: ObjectId,
  user_id: ObjectId,
  description: String
});



module.exports = mongoose.model('Reservation', reservationSchema);
