const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  barbers_id: {type: String, required: true}, //ObjectId
  thumb: String,
  reviewer: {type: String, required:true},
  body: String,
  rating: Number,
  createdAt: String
});

module.exports = mongoose.model('Review', reviewSchema);
