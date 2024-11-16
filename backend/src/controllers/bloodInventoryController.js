const BloodInventory = require("../models/BloodInventory");

// Create new blood inventory
const createBloodInventory = async (req, res) => {
  const { bloodBankId, bloodGroup, quantity, expirationDate, collectionDate, location, notes } = req.body;

  try {
    const bloodInventory = new BloodInventory({
      bloodBankId,
      bloodGroup,
      quantity,
      expirationDate,
      collectionDate,
      location,
      notes,
    });

    await bloodInventory.save();
    res.status(201).json({ message: "Blood inventory added successfully", bloodInventory });
  } catch (error) {
    console.error(`[ERROR] Error adding blood inventory: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all blood inventory with pagination, filtering, and soft delete check
const getAllBloodInventory = async (req, res) => {
  const { page = 1, limit = 10, bloodGroup, location, sortBy = "quantity", order = "asc" } = req.query;

  try {
    const filter = { deleted: false };
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (location) filter.location = location;

    const totalRecords = await BloodInventory.countDocuments(filter);
    const totalPages = Math.ceil(totalRecords / limit);

    const inventory = await BloodInventory.find(filter)
      .populate("bloodBankId", "name email")
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      metadata: { totalRecords, currentPage: parseInt(page), totalPages },
      data: inventory,
    });
  } catch (error) {
    console.error(`[ERROR] Error fetching blood inventory: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

// Update blood inventory
const updateBloodInventory = async (req, res) => {
  const { id } = req.params;
  const { quantity, expirationDate, location, notes } = req.body;

  try {
    const bloodInventory = await BloodInventory.findById(id);
    if (!bloodInventory || bloodInventory.deleted) {
      return res.status(404).json({ message: "Blood inventory not found" });
    }

    if (quantity !== undefined) bloodInventory.quantity = quantity;
    if (expirationDate) bloodInventory.expirationDate = expirationDate;
    if (location) bloodInventory.location = location;
    if (notes) bloodInventory.notes = notes;

    await bloodInventory.save();
    res.status(200).json({ message: "Blood inventory updated successfully", bloodInventory });
  } catch (error) {
    console.error(`[ERROR] Error updating blood inventory: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

// Soft delete blood inventory
const deleteBloodInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const bloodInventory = await BloodInventory.findById(id);
    if (!bloodInventory || bloodInventory.deleted) {
      return res.status(404).json({ message: "Blood inventory not found" });
    }

    bloodInventory.deleted = true;
    await bloodInventory.save();
    res.status(200).json({ message: "Blood inventory soft-deleted successfully" });
  } catch (error) {
    console.error(`[ERROR] Error deleting blood inventory: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

// Get blood inventory by blood group
const getBloodInventoryByBloodGroup = async (req, res) => {
  const { bloodGroup } = req.params;

  try {
    const inventory = await BloodInventory.find({ bloodGroup, deleted: false });
    if (inventory.length === 0) {
      return res.status(404).json({ message: `No inventory found for blood group: ${bloodGroup}` });
    }
    res.status(200).json(inventory);
  } catch (error) {
    console.error(`[ERROR] Error fetching blood inventory by blood group: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

// Get expiring blood inventory (e.g., within the next 30 days)
const getExpiringBloodInventory = async (req, res) => {
  const today = new Date();
  const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 30));

  try {
    const inventory = await BloodInventory.find({
      expirationDate: { $lt: thirtyDaysFromNow },
      deleted: false,
    });

    if (inventory.length === 0) {
      return res.status(404).json({ message: "No blood inventory expiring soon" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    console.error(`[ERROR] Error fetching expiring blood inventory: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBloodInventory,
  getAllBloodInventory,
  updateBloodInventory,
  deleteBloodInventory,
  getBloodInventoryByBloodGroup,
  getExpiringBloodInventory,
};
