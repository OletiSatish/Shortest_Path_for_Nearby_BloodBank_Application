const mongoose = require("mongoose");

const BloodInventorySchema = new mongoose.Schema({
  bloodBankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Refers to the user model for blood bank administrators or managers
    required: true,
  },
  bloodGroup: { 
    type: String, 
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // Ensures valid blood group types
  },
  quantity: { 
    type: Number, 
    required: true,
    min: [0, "Quantity cannot be negative"], // Ensures non-negative quantities
  },
  expirationDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(v) {
        return v > Date.now(); // Expiration date should be a future date
      },
      message: "Expiration date should be a future date"
    }
  },
  collectionDate: { 
    type: Date, 
    required: true,
    default: Date.now, // Defaults to the current date if not provided
  },
  location: { 
    type: String, 
    required: true,
  },
  notes: {
    type: String,
    maxlength: 200, // Optional: Limits the length of notes for clarity
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("BloodInventory", BloodInventorySchema);
