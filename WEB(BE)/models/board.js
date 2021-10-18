const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  body: {type: String, required: true},
  recommendation: {type: Number, default: 0},
  recommend_user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  comment: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  createdAt: {type: Date, default: Date.now },
  board: {type: Boolean, default: true}
});

module.exports = mongoose.model('Board', boardSchema);
