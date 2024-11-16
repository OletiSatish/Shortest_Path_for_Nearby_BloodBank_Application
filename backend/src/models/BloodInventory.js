const mongoose = require("mongoose");

const BloodInventorySchema = new mongoose.Schema(
  {
    bloodBankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BloodBank",
      required: true,
    },
    bloodGroup: { type: String, required: true },
    quantity: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
    collectionDate: { type: Date, required: true },
    location: { type: String, required: true },
    notes: { type: String },
    deleted: { type: Boolean, default: false }, // Soft delete flag
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodInventory", BloodInventorySchema);
