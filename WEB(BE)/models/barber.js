const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  location_detail: { type: String, required: true },
  rating: { type: Number, default: 0 },
  phone: { type: String, required: true },
  thumb: { type: String, default: null },
  description: { type: String, default: null },
  partnership: [String],
});

module.exports = mongoose.model('Barber', barberSchema);
