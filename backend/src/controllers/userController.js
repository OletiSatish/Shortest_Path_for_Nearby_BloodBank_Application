const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, phone, bloodGroup, address, age, role } = req.body;
  console.log(`[INFO] Attempting to register new user: ${email}`);

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log(`[ERROR] Registration failed - user already exists: ${email}`);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`[INFO] Password hashed successfully for: ${email}`);

    // Create new user with role
    user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      bloodGroup,
      address,
      age,
      role,
    });

    await user.save();
    console.log(`[SUCCESS] User registered successfully: ${email}`);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(`[ERROR] Error registering user (${email}): ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user and generate JWT token
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(`[INFO] User login attempt: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`[ERROR] Invalid login - user not found: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`[ERROR] Invalid login - incorrect password for: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(`[SUCCESS] Login successful for user: ${email}`);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(`[ERROR] Error during login for (${email}): ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(`[INFO] Fetching user by ID: ${id}`);

  try {
    const user = await User.findById(id);
    if (!user) {
      console.log(`[ERROR] User not found with ID: ${id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`[SUCCESS] User fetched successfully: ${id}`);
    res.status(200).json(user);
  } catch (error) {
    console.error(`[ERROR] Error fetching user by ID (${id}): ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user details
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  console.log(`[INFO] Updating user with ID: ${id}, Updates: ${JSON.stringify(updates)}`);

  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      console.log(`[ERROR] User not found for update with ID: ${id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`[SUCCESS] User updated successfully: ${id}`);
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(`[ERROR] Error updating user (${id}): ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(`[INFO] Attempting to delete user with ID: ${id}`);

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      console.log(`[ERROR] User not found for deletion with ID: ${id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`[SUCCESS] User deleted successfully: ${id}`);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(`[ERROR] Error deleting user (${id}): ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  console.log(`[INFO] Fetching all users (Admin only)`);

  try {
    const users = await User.find();
    console.log(`[SUCCESS] All users fetched successfully. Total users: ${users.length}`);
    res.status(200).json(users);
  } catch (error) {
    console.error(`[ERROR] Error fetching all users: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
