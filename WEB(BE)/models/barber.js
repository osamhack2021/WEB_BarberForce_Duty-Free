const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  location_detail: { type: String, required: true },
  weekday: { start: { hour: Number, minute: Number }, end: { hour: Number, minute: Number } },
  weekend: { start: { hour: Number, minute: Number }, end: { hour: Number, minute: Number } },
  rating: { type: Number, default: 0 },
  phone: { type: String, required: true },
  thumb: { type: String, default: null },
  description: { type: String, default: null },
  partnership: [String],
  disinfection: { type: Boolean, default: false },
});

module.exports = mongoose.model('Barber', barberSchema);
