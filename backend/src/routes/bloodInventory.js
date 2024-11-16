
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createBloodInventory,
  getAllBloodInventory,
  getBloodInventoryByBloodBank,
  softdeleteBloodInventory,
  updateBloodInventory,
  getBloodInventoryByBloodGroup,
  getExpiringBloodInventory,
} = require("../controllers/bloodInventoryController");

// Route to create new blood inventory (only accessible by admin or bloodbank roles)
router.post("/create", protect(["Admin", "bloodbank"]), createBloodInventory);

// Route to get all blood inventory (accessible by all authenticated users)
router.get("/all", protect, getAllBloodInventory);

// Route to get blood inventory by specific blood bank (accessible by all authenticated users)
router.get("/bloodBank/:bloodBankId", protect, getBloodInventoryByBloodBank);

// Route to update blood inventory (only accessible by admin or bloodbank roles)
router.put(
  "/update/:id",
  protect(["Admin", "bloodbank"]),
  updateBloodInventory
);

// Route to soft delete blood inventory (only accessible by admin or bloodbank roles)
router.delete(
  "/delete/:id",
  protect(["Admin", "bloodbank"]),
  softdeleteBloodInventory
);

// Route to get blood inventory by blood group (accessible by all authenticated users)
router.get("/bloodGroup/:bloodGroup", protect, getBloodInventoryByBloodGroup);

// Route to get expiring blood inventory (only accessible by admin or bloodbank roles)
router.get(
  "/expiring",
  protect(["Admin", "bloodbank"]),
  getExpiringBloodInventory
);

module.exports = router;
