const BloodRequest = require("../models/BloodRequest");

// Create a new blood request
const createBloodRequest = async (req, res) => {
  try {
    const { bloodGroup, quantity } = req.body;
    const userId = req.user._id; // Assuming user is attached to the request by authentication middleware

    // Create the new blood request
    const newBloodRequest = new BloodRequest({
      userId,
      bloodGroup,
      quantity,
      status: "pending", // default status is "pending"
    });

    await newBloodRequest.save();
    console.log(`[SUCCESS]: Blood request created for User: ${userId}, Blood Group: ${bloodGroup}, Quantity: ${quantity}`);
    res.status(201).json({ message: "Blood request created successfully", request: newBloodRequest });
  } catch (error) {
    console.error(`[ERROR]: Failed to create blood request. Reason: ${error.message}`);
    res.status(500).json({ message: "Failed to create blood request" });
  }
};

// Get all blood requests (admin only)
const getAllBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().populate("userId");
    console.log(`[SUCCESS]: Fetched all blood requests. Count: ${requests.length}`);
    res.status(200).json(requests);
  } catch (error) {
    console.error(`[ERROR]: Failed to fetch all blood requests. Reason: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch blood requests" });
  }
};

// Get all blood requests for a specific user (user or admin)
const getBloodRequestsByUser = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ userId: req.user._id });
    console.log(`[SUCCESS]: Fetched blood requests for User ID: ${req.user._id}. Count: ${requests.length}`);
    res.status(200).json(requests);
  } catch (error) {
    console.error(`[ERROR]: Failed to fetch blood requests for User ID: ${req.user._id}. Reason: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch blood requests" });
  }
};

// Get a specific blood request by ID
const getBloodRequestById = async (req, res) => {
  try {
    const bloodRequest = await BloodRequest.findById(req.params.id).populate("userId");
    if (!bloodRequest) {
      console.log(`[ERROR]: Blood request with ID: ${req.params.id} not found`);
      return res.status(404).json({ message: "Blood request not found" });
    }
    console.log(`[SUCCESS]: Fetched blood request with ID: ${req.params.id}`);
    res.status(200).json(bloodRequest);
  } catch (error) {
    console.error(`[ERROR]: Failed to fetch blood request with ID: ${req.params.id}. Reason: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch blood request" });
  }
};

// Update a blood request's status (admin only)
const updateBloodRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Ensure status is valid
    if (!["pending", "approved", "rejected"].includes(status)) {
      console.log(`[ERROR]: Invalid status provided: ${status}`);
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedRequest = await BloodRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedRequest) {
      console.log(`[ERROR]: Blood request with ID: ${id} not found`);
      return res.status(404).json({ message: "Blood request not found" });
    }

    console.log(`[SUCCESS]: Updated blood request status to '${status}' for Request ID: ${id}`);
    res.status(200).json({ message: "Blood request status updated", request: updatedRequest });
  } catch (error) {
    console.error(`[ERROR]: Failed to update blood request status for ID: ${req.params.id}. Reason: ${error.message}`);
    res.status(500).json({ message: "Failed to update blood request" });
  }
};

// Delete a blood request (admin or user who created the request)
const deleteBloodRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the blood request exists
    const bloodRequest = await BloodRequest.findById(id);
    if (!bloodRequest) {
      console.log(`[ERROR]: Blood request with ID: ${id} not found`);
      return res.status(404).json({ message: "Blood request not found" });
    }

    // Check if the user is authorized to delete (either admin or the user who created the request)
    if (req.user._id.toString() !== bloodRequest.userId.toString() && req.user.role !== "admin") {
      console.log(`[ERROR]: User ID: ${req.user._id} attempted to delete a request they did not create`);
      return res.status(403).json({ message: "You can only delete your own requests or be an admin" });
    }

    await bloodRequest.remove();
    console.log(`[SUCCESS]: Blood request with ID: ${id} deleted successfully`);
    res.status(200).json({ message: "Blood request deleted successfully" });
  } catch (error) {
    console.error(`[ERROR]: Failed to delete blood request with ID: ${req.params.id}. Reason: ${error.message}`);
    res.status(500).json({ message: "Failed to delete blood request" });
  }
};

module.exports = {
  createBloodRequest,
  getAllBloodRequests,
  getBloodRequestsByUser,
  getBloodRequestById,
  updateBloodRequestStatus,
  deleteBloodRequest,
};
