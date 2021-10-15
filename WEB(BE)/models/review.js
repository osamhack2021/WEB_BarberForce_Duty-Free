const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  barber: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber' },
  thumb: { type: String, default: null },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  body: { type: String, default: '' },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
