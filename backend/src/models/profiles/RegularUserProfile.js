const mongoose = require("mongoose");
const UserProfile = require("./UserProfile");

const regularUserProfileSchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  dob: { type: Date, required: true },
});

module.exports = UserProfile.discriminator(
  "RegularUserProfile",
  regularUserProfileSchema
);
