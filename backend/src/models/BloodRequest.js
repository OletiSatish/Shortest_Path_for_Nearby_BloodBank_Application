const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bloodGroup: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  requestDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
