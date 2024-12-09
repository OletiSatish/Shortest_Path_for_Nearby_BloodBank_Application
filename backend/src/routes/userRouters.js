const exprees = require("express");

const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = exprees.Router();

// only admin can access

router.get("/admin",authenticate, authorize(["admin"]),  (req, res) => {
  res.json({
    message: "Welcome admin",
  });
});

// Both admin and bloodbank can access

router.get("/bloodbank", authenticate, authorize(["admin", "bloodbank"]), (req, res) => {
  res.json({
    message: "Welcome Bloodbank",
  });
});

// All are can be access

router.get("/user", (req, res) => {
  res.json({
    message: "Welcome User",
  });
});

module.exports = router;
