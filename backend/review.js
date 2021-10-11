const mongoose = require('mongoose');

<<<<<<< HEAD
const reviewSchema = new mongoose.Schema({
=======
const barbersSchema = new mongoose.Schema({
>>>>>>> 059402fa38b0e60de43ee3647fc587b00d7ffc48
  barbers_id: {type: String, required: true}, //ObjectId
  thumb: String,
  reviewer: {type: String, required:true},
  body: String,
  rating: Number,
  createdAt: String
});

<<<<<<< HEAD
module.exports = mongoose.model('Review', reviewSchema);
=======
module.exports = mongoose.model('Review', barbersSchema);
>>>>>>> 059402fa38b0e60de43ee3647fc587b00d7ffc48
