const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  unitName: { type: String, required: true },
  soldier_id: [{ type: String }],
  barbers_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Barber' }],
});

module.exports = mongoose.model('Unit', unitSchema);
