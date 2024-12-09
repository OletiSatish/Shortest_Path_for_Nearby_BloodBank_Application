const mongoose = require("mongoose");

const BloodInventorySchema = new mongoose.Schema(
  {
    bloodBankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BloodBank",
      required: true,
    }, // Reference to the blood bank owning the inventory
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], // Restrict to valid blood groups
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, // Ensure quantity is never negative
    },
    expirationDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > new Date(); // Ensure expiration date is in the future
        },
        message: "Expiration date must be in the future.",
      },
    },
    collectionDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true, // Physical location of the blood stock
    },
    storageCondition: {
      type: String,
      enum: ["cold storage", "room temperature"], // Specify storage conditions
      default: "cold storage",
    },
    notes: {
      type: String,
      maxlength: 500, // Optional notes with a character limit
    },
    deleted: {
      type: Boolean,
      default: false, // Soft delete flag
    },
  },
  { timestamps: true }
);

// Index for faster queries by blood bank and blood group
BloodInventorySchema.index({ bloodBankId: 1, bloodGroup: 1 });

module.exports = mongoose.model("BloodInventory", BloodInventorySchema);
