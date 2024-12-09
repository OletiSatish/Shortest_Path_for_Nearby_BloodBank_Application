const mongoose = require('mongoose');
const UserProfile = require('./UserProfile');

const adminProfileSchema = new mongoose.Schema({
  // Admins may not require additional fields, but you can add more if needed
});

module.exports = UserProfile.discriminator('AdminProfile', adminProfileSchema);
