const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser); // Open registration
router.post("/login", loginUser); // Open login

// Protected routes
// Admin-only routes
router.get("/getall", authenticate, authorize(["admin"]), getAllUsers); // Get all users
router.delete("/user/:id", authenticate, authorize(["admin"]), deleteUser); // Delete user by ID

// Admin, Blood Bank, and User: Shared routes
router.get(
  "/:id",
  authenticate,
  authorize(["admin", "user", "bloodbank"]),
  getUserById
); // Get user by ID
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "user", "bloodbank"]),
  updateUser
); // Update user by ID

module.exports = router;
