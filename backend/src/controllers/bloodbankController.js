const BloodBank = require("../models/BloodBank");

// Create a new blood bank
const createBloodBank = async (req, res) => {
  try {
    const bloodBank = await BloodBank.create(req.body);
    console.log("Blood bank created successfully:", bloodBank);
    res.status(201).json(bloodBank);
  } catch (error) {
    console.error("Error creating blood bank:", error.message);
    res.status(500).json({ message: "Failed to create blood bank" });
  }
};

// Get all blood banks
const getAllBloodBanks = async (req, res) => {
  try {
    const bloodBanks = await BloodBank.find();
    console.log(`Fetched ${bloodBanks.length} blood bank(s) successfully.`);
    res.status(200).json(bloodBanks);
  } catch (error) {
    console.error("Error fetching blood banks:", error.message);
    res.status(500).json({ message: "Failed to fetch blood banks" });
  }
};

// Get a single blood bank by ID
const getBloodBankById = async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);
    if (!bloodBank) {
      console.warn(`Blood bank with ID ${req.params.id} not found.`);
      return res.status(404).json({ message: "Blood bank not found" });
    }
    console.log("Fetched blood bank successfully:", bloodBank);
    res.status(200).json(bloodBank);
  } catch (error) {
    console.error("Error fetching blood bank:", error.message);
    res.status(500).json({ message: "Failed to fetch blood bank" });
  }
};

// Update a blood bank by ID
const updateBloodBank = async (req, res) => {
  try {
    const bloodBank = await BloodBank.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!bloodBank) {
      console.warn(`Blood bank with ID ${req.params.id} not found for update.`);
      return res.status(404).json({ message: "Blood bank not found" });
    }
    console.log("Blood bank updated successfully:", bloodBank);
    res.status(200).json(bloodBank);
  } catch (error) {
    console.error("Error updating blood bank:", error.message);
    res.status(500).json({ message: "Failed to update blood bank" });
  }
};

// Delete a blood bank by ID
const deleteBloodBank = async (req, res) => {
  try {
    const bloodBank = await BloodBank.findByIdAndDelete(req.params.id);
    if (!bloodBank) {
      console.warn(
        `Blood bank with ID ${req.params.id} not found for deletion.`
      );
      return res.status(404).json({ message: "Blood bank not found" });
    }
    console.log("Blood bank deleted successfully:", bloodBank);
    res.status(200).json({ message: "Blood bank deleted successfully" });
  } catch (error) {
    console.error("Error deleting blood bank:", error.message);
    res.status(500).json({ message: "Failed to delete blood bank" });
  }
};

module.exports = {
  createBloodBank,
  getAllBloodBanks,
  getBloodBankById,
  updateBloodBank,
  deleteBloodBank,
};
