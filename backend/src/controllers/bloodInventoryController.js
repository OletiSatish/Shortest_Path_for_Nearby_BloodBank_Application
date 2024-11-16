const BloodInventory = require("../models/BloodInventory");

// Create new blood inventory
const createBloodInventory = async (req, res) => {
  const {
    bloodBankId,
    bloodGroup,
    quantity,
    expirationDate,
    collectionDate,
    location,
    notes,
  } = req.body;

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
    res
      .status(201)
      .json({ message: "Blood inventory added successfully", bloodInventory });
  } catch (error) {
    console.error(`[ERROR] Error adding blood inventory: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all blood inventory with pagination, filtering, and soft delete check
const getAllBloodInventory = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    bloodGroup,
    location,
    sortBy = "quantity",
    order = "asc",
  } = req.query;

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
    res.status(200).json({
      message: "Blood inventory updated successfully",
      bloodInventory,
    });
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
    res
      .status(200)
      .json({ message: "Blood inventory soft-deleted successfully" });
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
      console.log(
        `[INFO] No blood inventory found for blood group: ${bloodGroup}`
      );
      return res
        .status(404)
        .json({ message: `No inventory found for blood group: ${bloodGroup}` });
    }
    console.log(
      `[SUCCESS] Retrieved blood inventory for blood group: ${bloodGroup}: ${JSON.stringify(
        inventory
      )}`
    );
    res.status(200).json(inventory);
  } catch (error) {
    console.error(
      `[ERROR] Error fetching blood inventory by blood group: ${error.message}`
    );
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
      return res
        .status(404)
        .json({ message: "No blood inventory expiring soon" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    console.error(
      `[ERROR] Error fetching expiring blood inventory: ${error.message}`
    );
    res.status(500).json({ message: "Server error" });
  }
};

// Get blood inventory by blood bank ID (excluding soft-deleted records)
const getBloodInventoryByBloodBank = async (req, res) => {
  const { bloodBankId } = req.params;

  try {
    // Fetch blood inventory records for the specific blood bank, excluding soft-deleted ones
    const inventory = await BloodInventory.find({
      bloodBankId,
      deleted: false, // Ensure soft-deleted records are excluded
    }).populate('bloodBankId', 'name email');

    if (inventory.length === 0) {
      console.log(`[INFO] No blood inventory found for blood bank ID: ${bloodBankId}`);
      return res.status(404).json({ message: 'No blood inventory found for this blood bank' });
    }

    console.log(`[SUCCESS] Retrieved blood inventory for blood bank ID: ${bloodBankId}: ${JSON.stringify(inventory)}`);
    res.status(200).json(inventory);
  } catch (error) {
    console.error(`[ERROR] Error fetching blood inventory by blood bank: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};


// Soft delete blood inventory by ID
const softdeleteBloodInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const bloodInventory = await BloodInventory.findById(id);

    if (!bloodInventory) {
      console.log(`[INFO] Blood inventory not found for ID: ${id}`);
      return res.status(404).json({ message: "Blood inventory not found" });
    }

    if (bloodInventory.deleted) {
      console.log(
        `[INFO] Blood inventory already marked as deleted for ID: ${id}`
      );
      return res
        .status(400)
        .json({ message: "Blood inventory already deleted" });
    }

    bloodInventory.deleted = true; // Mark as deleted
    await bloodInventory.save();

    console.log(`[SUCCESS] Blood inventory soft-deleted for ID: ${id}`);
    res
      .status(200)
      .json({ message: "Blood inventory soft-deleted successfully" });
  } catch (error) {
    console.error(
      `[ERROR] Error soft-deleting blood inventory: ${error.message}`
    );
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBloodInventory,
  getAllBloodInventory,
  updateBloodInventory,
  deleteBloodInventory,
  getBloodInventoryByBloodGroup,
  getBloodInventoryByBloodBank,
  getExpiringBloodInventory,
  softdeleteBloodInventory,
};
