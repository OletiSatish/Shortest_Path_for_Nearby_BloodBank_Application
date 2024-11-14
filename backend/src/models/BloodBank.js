// models/BloodBank.js
const mongoose = require("mongoose");

const BloodBankSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now }, // Date of creation
});

module.exports = mongoose.model("BloodBank", BloodBankSchema);
