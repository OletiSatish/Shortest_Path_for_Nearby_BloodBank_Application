const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  bloodBankId: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodBank', required: true },
  title: { type: String, required: true },
  description: { type: String },
  eventDate: { type: Date, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);
