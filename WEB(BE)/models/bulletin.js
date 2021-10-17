const mongoose = require('mongoose');

const bulletinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  body: {type: String, required: true},
  recommendation: {type: Number, defualt: 0},
  comment: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  createdAt: {type: Date, default: Date.now },
  free_billboard: {type: Boolean. default: true}
});

module.exports = mongoose.model('Bulletin', barberSchema);
