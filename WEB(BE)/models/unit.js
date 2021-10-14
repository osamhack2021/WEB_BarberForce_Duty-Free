const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  unitName: String,
  soldier_id: [String],
  barbers_id: [String],
});

module.exports = mongoose.model('Unit', unitSchema);
