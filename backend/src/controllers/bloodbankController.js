const BloodBank = require("../models/BloodBank");

// Create a new Blood Bank
const createBloodBank = async (req, res) => {
  const { name, email, address, location, phoneNumber, status } = req.body;
  console.log(
    `[INFO] Creating new Blood Bank with name: ${name}, email: ${email}`
  );

  // Validate required fields
  if (!name || !email || !address || !location || !phoneNumber) {
    return res
      .status(400)
      .json({
        message:
          "Please provide all required fields: name, email, address, location, phoneNumber",
      });
  }

  try {
    const bloodBank = new BloodBank({
      name,
      email,
      address,
      location,
      phoneNumber,
      status,
    });
    await bloodBank.save();
    console.log(`[INFO] Blood Bank created successfully: ${bloodBank._id}`);
    res
      .status(201)
      .json({ message: "Blood Bank created successfully", bloodBank });
  } catch (error) {
    console.error(`[ERROR] Error creating blood bank: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all Blood Banks
const getAllBloodBanks = async (req, res) => {
  console.log("[INFO] Fetching all blood banks");

  try {
    const bloodBanks = await BloodBank.find();
    console.log(`[INFO] Fetched ${bloodBanks.length} blood banks`);
    res.status(200).json(bloodBanks);
  } catch (error) {
    console.error(`[ERROR] Error fetching all blood banks: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single Blood Bank by ID
const getBloodBankById = async (req, res) => {
  const { id } = req.params;
  console.log(`[INFO] Fetching blood bank with ID: ${id}`);

  try {
    const bloodBank = await BloodBank.findById(id);
    if (!bloodBank) {
      console.error(`[ERROR] Blood Bank with ID: ${id} not found`);
      return res.status(404).json({ message: "Blood Bank not found" });
    }
    console.log(`[INFO] Fetched blood bank with ID: ${id}`);
    res.status(200).json(bloodBank);
  } catch (error) {
    console.error(`[ERROR] Error fetching blood bank by ID: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Blood Bank
const updateBloodBank = async (req, res) => {
  const { id } = req.params;
  const { address, location } = req.body; // Only destructure the fields you want to update
  console.log(`[INFO] Updating blood bank with ID: ${id}`);

  try {
    const bloodBank = await BloodBank.findById(id);
    if (!bloodBank) {
      console.error(`[ERROR] Blood Bank with ID: ${id} not found`);
      return res.status(404).json({ message: "Blood Bank not found" });
    }

    // Only update the fields provided in the request body
    if (address) {
      bloodBank.address = address;
    }
    if (location) {
      bloodBank.location = location;
    }

    // Save the updated blood bank information
    await bloodBank.save();
    console.log(`[INFO] Blood Bank with ID: ${id} updated successfully`);
    res
      .status(200)
      .json({ message: "Blood Bank updated successfully", bloodBank });
  } catch (error) {
    console.error(`[ERROR] Error updating blood bank: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Blood Bank
const deleteBloodBank = async (req, res) => {
  const { id } = req.params;
  console.log(`[INFO] Deleting blood bank with ID: ${id}`);

  try {
    const bloodBank = await BloodBank.findByIdAndDelete(id);
    if (!bloodBank) {
      console.error(`[ERROR] Blood Bank with ID: ${id} not found`);
      return res.status(404).json({ message: "Blood Bank not found" });
    }
    console.log(`[INFO] Blood Bank with ID: ${id} deleted successfully`);
    res.status(200).json({ message: "Blood Bank deleted successfully" });
  } catch (error) {
    console.error(`[ERROR] Error deleting blood bank: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBloodBank,
  getAllBloodBanks,
  getBloodBankById,
  updateBloodBank,
  deleteBloodBank,
};
