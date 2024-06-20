const mongoose = require("mongoose");

// Define the schema for the messages
const MessageSchema = new mongoose.Schema({
    conversationid: {
        type: String
    },
    senderid: {
        type: String
    },
    receiverid: {
        type: String
    },
    text: {
        type: String
    },
    type: {
        type: String
    }
},
{ 
    timestamps: true // Add timestamps for createdAt and updatedAt
});

// Create a model based on the schema
const message = mongoose.model('Message', MessageSchema);

// Export the message model
module.exports = message;
