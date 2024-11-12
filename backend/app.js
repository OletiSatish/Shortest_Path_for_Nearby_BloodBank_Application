const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// You can define your routes here. For example:
// app.use('/api/v1/some-route', require('./src/routes/someRoute'));

// Export the app to be used in server.js
module.exports = app;
