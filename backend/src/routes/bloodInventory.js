const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createBloodInventory,
  getAllBloodInventory,
  updateBloodInventory,
  deleteBloodInventory,
  getBloodInventoryByBloodGroup,
  getExpiringBloodInventory,
} = require("../controllers/bloodInventoryController");

// Route to create new blood inventory (admin or bloodbank only)
router.post("/create", protect(["Admin", "bloodbank"]), createBloodInventory);

// Route to get all blood inventory with pagination and filtering
router.get("/all", protect(), getAllBloodInventory);

// Route to update blood inventory (admin or bloodbank only)
router.put(
  "/update/:id",
  protect(["Admin", "bloodbank"]),
  updateBloodInventory
);

// Route to soft delete blood inventory (admin only)
router.delete("/delete/:id", protect(["Admin"]), deleteBloodInventory);

// Route to get blood inventory by blood group
router.get("/bloodGroup/:bloodGroup", protect(), getBloodInventoryByBloodGroup);

// Route to get expiring blood inventory (admin or bloodbank only)
router.get(
  "/expiring",
  protect(["Admin", "bloodbank"]),
  getExpiringBloodInventory
);

module.exports = router;
