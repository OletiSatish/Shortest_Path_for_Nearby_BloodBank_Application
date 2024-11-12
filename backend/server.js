const express = require('express');
const connectDB = require('./src/config/db'); // Import the database connection
const app = require('./app'); // Import the app setup

require('dotenv').config(); // Load environment variables from .env file

// Connect to the database
connectDB();

// Set the port from environment variable or default to 8080
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
