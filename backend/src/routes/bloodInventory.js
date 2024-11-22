const express = require("express");
const {
  createBloodInventory,
  getInventoryByBloodBank,
  getBloodInventoryById,
  getAllInventories,
  updateBloodInventory,
  deleteBloodInventory,
} = require("../controllers/bloodInventoryController");

const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Protected Routes (Admin)
 */

// Get all blood inventories across all blood banks
router.get(
  "/all",
  authenticate,
  authorize(["admin"]),
  getAllInventories // New Route Handler
);

/**
 * Protected Routes (Admin or Blood Bank)
 */

// Get all inventory items for a specific blood bank by blood bank ID
router.get(
  "/bloodbank/:bloodBankId",
  authenticate,
  authorize(["admin", "bloodbank"]),
  getInventoryByBloodBank
);

// Get details of a specific inventory item by its ID
router.get(
  "/item/:id",
  authenticate,
  authorize(["admin", "bloodbank"]),
  getBloodInventoryById
);

// Create a new blood inventory (restricted to Admin or Blood Bank roles)
router.post(
  "/create",
  authenticate,
  authorize(["admin", "bloodbank"]),
  createBloodInventory
);

// Update an existing blood inventory item by ID (restricted to Admin or Blood Bank roles)
router.put(
  "/update/:id",
  authenticate,
  authorize(["admin", "bloodbank"]),
  updateBloodInventory
);

// Delete a blood inventory item by ID (restricted to Admin or Blood Bank roles)
router.delete(
  "/delete/:id",
  authenticate,
  authorize(["admin", "bloodbank"]),
  deleteBloodInventory
);

module.exports = router;
