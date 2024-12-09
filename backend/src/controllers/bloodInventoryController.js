const BloodInventory = require("../models/BloodInventory");

// Create new blood inventory
const createBloodInventory = async (req, res) => {
  try {
    const inventory = await BloodInventory.create(req.body);
    res.status(201).json(inventory);
  } catch (error) {
    console.error("Error creating blood inventory:", error.message);
    res.status(500).json({ message: "Failed to create blood inventory" });
  }
};

// Get all blood inventory for a specific blood bank
const getInventoryByBloodBank = async (req, res) => {
  try {
    const inventory = await BloodInventory.find({
      bloodBankId: req.params.bloodBankId,
      deleted: false,
    });
    res.status(200).json(inventory);
  } catch (error) {
    console.error("Error fetching blood inventory:", error.message);
    res.status(500).json({ message: "Failed to fetch blood inventory" });
  }
};

// Get a specific inventory item by ID
const getBloodInventoryById = async (req, res) => {
  try {
    const inventory = await BloodInventory.findOne({
      _id: req.params.id,
      deleted: false,
    });
    if (!inventory) {
      return res.status(404).json({ message: "Blood inventory not found" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    console.error("Error fetching blood inventory:", error.message);
    res.status(500).json({ message: "Failed to fetch blood inventory" });
  }
};

// Update a blood inventory item
const updateBloodInventory = async (req, res) => {
  try {
    const inventory = await BloodInventory.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      req.body,
      { new: true, runValidators: true }
    );
    if (!inventory) {
      return res.status(404).json({ message: "Blood inventory not found" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    console.error("Error updating blood inventory:", error.message);
    res.status(500).json({ message: "Failed to update blood inventory" });
  }
};

// Soft delete a blood inventory item
const deleteBloodInventory = async (req, res) => {
  try {
    const inventory = await BloodInventory.findOneAndUpdate(
      { _id: req.params.id },
      { deleted: true },
      { new: true }
    );
    if (!inventory) {
      return res.status(404).json({ message: "Blood inventory not found" });
    }
    res.status(200).json({ message: "Blood inventory deleted successfully" });
  } catch (error) {
    console.error("Error deleting blood inventory:", error.message);
    res.status(500).json({ message: "Failed to delete blood inventory" });
  }
};

// get all Inventories

const getAllInventories = async (req, res) => {
  try {
    console.log("Fetching all blood inventories...");
    const inventories = await BloodInventory.find().populate("bloodBankId");
    console.log(`Fetched ${inventories.length} inventories.`);
    res.status(200).json(inventories);
  } catch (error) {
    console.error("Error fetching all inventories:", error.message);
    res.status(500).json({ message: "Failed to fetch all inventories." });
  }
};

module.exports = {
  createBloodInventory,
  getInventoryByBloodBank,
  getBloodInventoryById,
  getAllInventories, // Exported here
  updateBloodInventory,
  deleteBloodInventory,
};

module.exports = {
  createBloodInventory,
  getInventoryByBloodBank,
  getBloodInventoryById,
  updateBloodInventory,
  deleteBloodInventory,
  getAllInventories,
};
