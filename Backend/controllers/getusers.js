// Import the Userdemo Schema
const Userdemo = require("../models/userschemaauth-v2");

// Controller to get all users from the database
getusers = async (req, res) => {
    try {
        // Retrieve all users from the Userdemo collection in the database
        const users = await Userdemo.find({});
        
        // Respond with the list of users
        res.status(200).json(users);
    } catch (error) {
        // Handle errors, if any, and respond with an error status
        res.status(500).json(error);
    }
}

// Export the controller function to be used in the routes
module.exports = getusers;
