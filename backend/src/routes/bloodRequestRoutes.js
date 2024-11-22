const express = require("express");
const {
  createBloodRequest,
  getAllBloodRequests,
  getBloodRequestsByUser,
  getBloodRequestById,
  updateBloodRequestStatus,
  deleteBloodRequest,
} = require("../controllers/bloodRequestController");

const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Public Routes
 */

// Get all blood requests for the authenticated user
router.get("/user/requests", authenticate, async (req, res, next) => {
  try {
    console.log(`Fetching blood requests for user: ${req.user._id}`);
    await getBloodRequestsByUser(req, res);
  } catch (error) {
    console.error(`Error in /user/requests: ${error.message}`);
    next(error);
  }
});

// Get a specific blood request by ID
router.get("/request/:id", authenticate, async (req, res, next) => {
  try {
    console.log(`Fetching blood request by ID: ${req.params.id}`);
    await getBloodRequestById(req, res);
  } catch (error) {
    console.error(`Error in /request/${req.params.id}: ${error.message}`);
    next(error);
  }
});

/**
 * Protected Routes (Authenticated User or Admin)
 */

// Create a new blood request
router.post("/create", authenticate, async (req, res, next) => {
  try {
    console.log(`Creating a new blood request for user: ${req.user._id}`);
    await createBloodRequest(req, res);
  } catch (error) {
    console.error(`Error in /create: ${error.message}`);
    next(error);
  }
});

// Delete a blood request (must be creator or admin)
router.delete("/delete/:id", authenticate, async (req, res, next) => {
  try {
    console.log(`Attempting to delete blood request with ID: ${req.params.id}`);
    await deleteBloodRequest(req, res);
  } catch (error) {
    console.error(`Error in /delete/${req.params.id}: ${error.message}`);
    next(error);
  }
});

/**
 * Admin Routes
 */

// Get all blood requests (admin only)
router.get("/all", authenticate, authorize(["admin"]), async (req, res, next) => {
  try {
    console.log(`Fetching all blood requests (Admin access by: ${req.user._id})`);
    await getAllBloodRequests(req, res);
  } catch (error) {
    console.error(`Error in /all: ${error.message}`);
    next(error);
  }
});

/**
 * Blood Bank Routes
 */

// Update blood request status (blood bank only)
router.put(
  "/update/:id",
  authenticate,
  authorize(["bloodbank"]),
  async (req, res, next) => {
    try {
      console.log(
        `Updating blood request status for ID: ${req.params.id}, by blood bank: ${req.user._id}`
      );
      await updateBloodRequestStatus(req, res);
    } catch (error) {
      console.error(`Error in /update/${req.params.id}: ${error.message}`);
      next(error);
    }
  }
);

module.exports = router;
