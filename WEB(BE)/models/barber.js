const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  location_detail: { type: String, required: true },
  weekday: { start: { type: Date }, end: { type: Date }},
  weekend: { start: { type: Date }, end: { type: Date }},
  rating: { type: Number, default: 0 },
  phone: { type: String, required: true },
  thumb: { type: String, default: null },
  description: { type: String, default: null },
  partnership: [ {type: mongoose.Schema.Types.ObjectId} ],
  disinfection: { type: Boolean, default: false}
});

module.exports = mongoose.model('Barber', barberSchema);
