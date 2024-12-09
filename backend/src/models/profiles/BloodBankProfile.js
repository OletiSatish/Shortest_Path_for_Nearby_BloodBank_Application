const mongoose = require('mongoose');
const UserProfile = require('./UserProfile');

const bloodBankProfileSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
});

module.exports = UserProfile.discriminator('BloodBankProfile', bloodBankProfileSchema);
