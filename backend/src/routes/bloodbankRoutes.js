const express = require("express");
const {
  createBloodBank,
  getAllBloodBanks,
  getBloodBankById,
  updateBloodBank,
  deleteBloodBank,
} = require("../controllers/bloodbankController");

// const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Public route: Get all blood banks
router.get("/", getAllBloodBanks);

// Public route: Get a specific blood bank by ID
router.get("/:id", getBloodBankById);

// Protected route: Create a new blood bank (Admin only)
// router.post("/create", authenticate, authorize(["admin"]), createBloodBank);

router.post("/create", createBloodBank);

// Protected route: Update a blood bank (Admin only)
// router.put("/:id", authenticate, authorize(["admin"]), updateBloodBank);


router.put("/:id", updateBloodBank);

// Protected route: Delete a blood bank (Admin only)
// router.delete("/:id", authenticate, authorize(["admin"]), deleteBloodBank);

router.delete("/:id", deleteBloodBank);

module.exports = router;
