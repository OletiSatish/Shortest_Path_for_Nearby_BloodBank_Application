const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

/**
 * Register a new user
 */
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    console.log("Attempting to register a new user.");

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`Registration failed: User with email ${email} already exists.`);
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    console.log(`User registered successfully: ${username} (${email}).`);

    res.status(201).json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};

/**
 * Login user
 */

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`Login attempt for email: ${email}`);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Login failed: User with email ${email} not found.`);
      return res.status(404).json({ message: "User not found." });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Login failed: Invalid password for email ${email}.`);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    console.log(`Login successful for email: ${email}`);

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};


/**
 * Get all users
 */
exports.getAllUsers = async (req, res) => {
  try {
    console.log("Fetching all users.");
    const users = await User.find();
    console.log(`Found ${users.length} users.`);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};

/**
 * Get user by ID
 */
exports.getUserById = async (req, res) => {
  try {
    console.log(`Fetching user by ID: ${req.params.id}`);
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log(`User with ID ${req.params.id} not found.`);
      return res.status(404).json({ message: "User not found." });
    }
    console.log(`User found: ${user.username}`);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};

/**
 * Update user
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    console.log(`Updating user with ID: ${id}`);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, role },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      console.log(`Update failed: User with ID ${id} not found.`);
      return res.status(404).json({ message: "User not found." });
    }

    console.log(`User updated successfully: ${updatedUser.username} (${updatedUser.email}).`);
    res.status(200).json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};

/**
 * Delete user
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`Attempting to delete user with ID: ${id}`);

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      console.log(`Deletion failed: User with ID ${id} not found.`);
      return res.status(404).json({ message: "User not found." });
    }

    console.log(`User deleted successfully: ${deletedUser.username} (${deletedUser.email}).`);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};
