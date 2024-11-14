const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createBloodInventory,
  getAllBloodInventory,
  getBloodInventoryByBloodBank,
  updateBloodInventory,
  deleteBloodInventory,
  getBloodInventoryByBloodGroup,
  getExpiringBloodInventory,
} = require("../controllers/bloodInventoryController");

// Route to create new blood inventory (only accessible by Admin or BloodBank roles)
router.post("/create", protect(["Admin", "bloodbank"]), createBloodInventory);

// Route to get all blood inventory (accessible by all authenticated users)
router.get("/all", protect([]), getAllBloodInventory);

// Route to get blood inventory by specific blood bank (accessible by all authenticated users)
router.get(
  "/bloodBank/:bloodBankId",
  protect([]),
  getBloodInventoryByBloodBank
);

// Route to update blood inventory (only accessible by Admin or BloodBank roles)
router.put(
  "/update/:id",
  protect(["Admin", "bloodbank"]),
  updateBloodInventory
);

// Route to delete blood inventory (only accessible by Admin role)
router.delete("/delete/:id", protect(["Admin"]), deleteBloodInventory);

// Route to get blood inventory by blood group (accessible by all authenticated users)
router.get(
  "/bloodGroup/:bloodGroup",
  protect([]),
  getBloodInventoryByBloodGroup
);

// Route to get expiring blood inventory (only accessible by Admin or BloodBank roles)
router.get(
  "/expiring",
  protect(["Admin", "bloodbank"]),
  getExpiringBloodInventory
);

module.exports = router;
