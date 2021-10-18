const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post : { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  body: {type: String, required: true},
  recommendation: {type: Number, defualt: 0},
  recommend_user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  createdAt: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
