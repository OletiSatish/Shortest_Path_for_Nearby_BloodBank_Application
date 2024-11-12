const mongoose = require('mongoose');

// MongoDB URI from environment variables
const dbURI = process.env.MONGODB_URI

console.log(dbURI, "MongoDB URI");

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    if (!dbURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    // Connect to MongoDB using the URI without deprecated options
    await mongoose.connect(dbURI);

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Export the connectDB function to be used in server.js
module.exports = connectDB;
