const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  time: { type: Date, required: true },
  barber: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: Date, default: '' },
  done: { type: Boolean, default: false },
});

module.exports = mongoose.model('Reservation', reservationSchema);
