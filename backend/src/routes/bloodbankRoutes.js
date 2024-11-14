const express = require("express");
const router = express.Router();
const {
  createBloodBank,
  getAllBloodBanks,
  getBloodBankById,
  updateBloodBank,
  deleteBloodBank,
} = require("../controllers/bloodbankController"); // Ensure this is correct

const { protect } = require("../middleware/authMiddleware"); // Protect middleware

// Route protection: Only admins can create, update, or delete blood banks

// Create a new Blood Bank - Protected Route (Admin only)
router.post("/create", protect(["Admin"]), createBloodBank);

// Get all Blood Banks - Public Route (accessible to all)
router.get("/", getAllBloodBanks);

// Get a single Blood Bank by ID - Public Route (accessible to all)
router.get("/:id", getBloodBankById);

// Update Blood Bank - Protected Route (Admin only)
// You can add more roles to the array if you want to allow more users (e.g., Managers) to update
router.put("/:id", protect(["Admin"]), updateBloodBank);

// Delete Blood Bank - Protected Route (Admin only)
// You can add more roles to the array if needed
router.delete("/:id", protect(["Admin"]), deleteBloodBank);

module.exports = router;
