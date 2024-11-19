const mongoose = require("mongoose");

const BloodBankSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Blood bank name
  hospitalName: { type: String, required: true }, // Associated hospital name
  email: { type: String, required: true, unique: true }, // Email address for contact
  address: { type: String, required: true }, // Complete address
  city: { type: String, required: true }, // City of the blood bank
  state: { type: String, required: true }, // State of the blood bank
  phoneNumber: { type: String, required: true }, // Contact phone number
  status: { type: String, enum: ["active", "inactive"], default: "active" }, // Operational status
  inventory: [
    {
      bloodGroup: {
        type: String,
        required: true,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], // Restrict to valid blood groups
      },
      quantity: { type: Number, required: true, default: 0 }, // Units available
      expiryDate: { type: Date, required: true }, // Expiry date of the blood stock
    },
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // Reference to associated events
    },
  ],
  location: {
    latitude: { type: Number, required: true }, // Geolocation latitude
    longitude: { type: Number, required: true }, // Geolocation longitude
  },
  createdAt: { type: Date, default: Date.now }, // Date of creation
  updatedAt: { type: Date, default: Date.now }, // Date of last update
});

// Middleware to update `updatedAt` on document save
BloodBankSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("BloodBank", BloodBankSchema);
