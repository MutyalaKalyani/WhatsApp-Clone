// Import necessary libraries and modules
const express = require("express");
const app = express();
const cors = require("cors");
const { databaseconnection } = require("./database/db");
const userroute = require("./route");
require("dotenv").config();

// Enable JSON request parsing
app.use(express.json());
  
// Establish a connection to the database
databaseconnection();

// Set the server port
const PORT = 8000;
// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// Enable CORS for all routes
app.use(cors());
// Set up the main route using the userroute module
app.use("/", userroute);
