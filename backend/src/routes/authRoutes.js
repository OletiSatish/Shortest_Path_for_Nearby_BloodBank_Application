const express = require("express");
const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register user (open to all)
router.post("/register", registerUser);

// Login user (open to all)
router.post("/login", loginUser);

// CRUD Routes (only accessible to Admin or the logged-in user)
router.get(
  "/user/:id",
  protect(["User", "Admin"]),
  async (req, res, next) => {
    // Check if user is accessing their own data or an Admin is accessing any user
    if (req.user.id !== req.params.id && !req.user.role == "Admin") {
      return res
        .status(403)
        .json({
          message: "Access forbidden: You can only access your own data",
        });
    }
    next();
  },
  getUserById
);

router.put(
  "/user/:id",
  protect(["User", "Admin"]),
  async (req, res, next) => {
    // Check if user is updating their own data or Admin is updating any user
    if (req.user.id !== req.params.id && req.user.role !== "Admin") {
      return res
        .status(403)
        .json({
          message: "Access forbidden: You can only update your own data",
        });
    }
    next();
  },
  updateUser
);

router.delete(
  "/user/:id",
  protect(["User", "Admin"]),
  async (req, res, next) => {
    // Check if user is deleting their own data or Admin is deleting any user
    if (req.user.id !== req.params.id && req.user.role !== "Admin") {
      return res
        .status(403)
        .json({
          message: "Access forbidden: You can only delete your own data",
        });
    }
    next();
  },
  deleteUser
);

// Admin route to get all users
router.get("/admin/users", protect(["Admin"]), getAllUsers);

module.exports = router;
