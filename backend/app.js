const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const bloodInventoryRoutes = require('./src/routes/bloodInventory');
const bloodbankRoutes = require("./src/routes/bloodbankRoutes")

// Initialize the Express app
const app = express();

// Set up CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Enable credentials if you need to send cookies
}));

// Middleware setup
app.use(express.json()); // Middleware to parse JSON requests
app.use(bodyParser.json());

// Routes
// Auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/bloodInventory', bloodInventoryRoutes);
app.use('/api/bloodbank/', bloodbankRoutes);

module.exports = app;
