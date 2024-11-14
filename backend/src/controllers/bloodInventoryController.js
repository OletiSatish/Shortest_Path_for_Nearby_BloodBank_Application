const BloodInventory = require('../models/BloodInventory');

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
    console.log(`[SUCCESS] Blood inventory added successfully: ${JSON.stringify(bloodInventory)}`);
    res.status(201).json({ message: 'Blood inventory added successfully', bloodInventory });
  } catch (error) {
    console.error(`[ERROR] Error adding blood inventory: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all blood inventory
const getAllBloodInventory = async (req, res) => {
  try {
    const inventory = await BloodInventory.find().populate('bloodBankId', 'name email');
    console.log(`[SUCCESS] Retrieved all blood inventory: ${JSON.stringify(inventory)}`);
    res.status(200).json(inventory);
  } catch (error) {
    console.error(`[ERROR] Error fetching blood inventory: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get blood inventory by blood bank ID
const getBloodInventoryByBloodBank = async (req, res) => {
  const { bloodBankId } = req.params;

  try {
    const inventory = await BloodInventory.find({ bloodBankId }).populate('bloodBankId', 'name email');
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

// Update blood inventory
const updateBloodInventory = async (req, res) => {
  const { id } = req.params;
  const { quantity, expirationDate, location, notes } = req.body;

  try {
    const bloodInventory = await BloodInventory.findById(id);

    if (!bloodInventory) {
      console.log(`[INFO] Blood inventory not found for ID: ${id}`);
      return res.status(404).json({ message: 'Blood inventory not found' });
    }

    // Update fields if provided
    if (quantity !== undefined) bloodInventory.quantity = quantity;
    if (expirationDate) bloodInventory.expirationDate = expirationDate;
    if (location) bloodInventory.location = location;
    if (notes) bloodInventory.notes = notes;

    await bloodInventory.save();
    console.log(`[SUCCESS] Blood inventory updated successfully for ID: ${id}: ${JSON.stringify(bloodInventory)}`);
    res.status(200).json({ message: 'Blood inventory updated successfully', bloodInventory });
  } catch (error) {
    console.error(`[ERROR] Error updating blood inventory: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete blood inventory by ID
const deleteBloodInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const bloodInventory = await BloodInventory.findByIdAndDelete(id);
    if (!bloodInventory) {
      console.log(`[INFO] Blood inventory not found for ID: ${id}`);
      return res.status(404).json({ message: 'Blood inventory not found' });
    }

    console.log(`[SUCCESS] Blood inventory deleted successfully for ID: ${id}`);
    res.status(200).json({ message: 'Blood inventory deleted successfully' });
  } catch (error) {
    console.error(`[ERROR] Error deleting blood inventory: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get blood inventory by blood group
const getBloodInventoryByBloodGroup = async (req, res) => {
  const { bloodGroup } = req.params;

  try {
    const inventory = await BloodInventory.find({ bloodGroup });
    if (inventory.length === 0) {
      console.log(`[INFO] No blood inventory found for blood group: ${bloodGroup}`);
      return res.status(404).json({ message: `No inventory found for blood group: ${bloodGroup}` });
    }
    console.log(`[SUCCESS] Retrieved blood inventory for blood group: ${bloodGroup}: ${JSON.stringify(inventory)}`);
    res.status(200).json(inventory);
  } catch (error) {
    console.error(`[ERROR] Error fetching blood inventory by blood group: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get expiring blood inventory (e.g., within the next 30 days)
const getExpiringBloodInventory = async (req, res) => {
  const today = new Date();
  const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 30));

  try {
    const inventory = await BloodInventory.find({ expirationDate: { $lt: thirtyDaysFromNow } });
    if (inventory.length === 0) {
      console.log(`[INFO] No blood inventory expiring soon`);
      return res.status(404).json({ message: 'No blood inventory expiring soon' });
    }
    console.log(`[SUCCESS] Retrieved expiring blood inventory: ${JSON.stringify(inventory)}`);
    res.status(200).json(inventory);
  } catch (error) {
    console.error(`[ERROR] Error fetching expiring blood inventory: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  createBloodInventory,
  getAllBloodInventory,
  getBloodInventoryByBloodBank,
  updateBloodInventory,
  deleteBloodInventory,
  getBloodInventoryByBloodGroup,
  getExpiringBloodInventory
};
