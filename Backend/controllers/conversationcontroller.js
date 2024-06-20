// Import the Conversation Schema
const conversationschema = require("../models/conversationschema");

// Controller to set up a new conversation
exports.setconversation = async (req, res) => {
    try {
        // Extract sender and receiver IDs from the request body
        const senderid = req.body.senderid;
        const receiverid = req.body.receiverid;

        // Check if a conversation already exists between the members
        const exist = await conversationschema.findOne({ members: { $all: [senderid, receiverid] } });

        // If the conversation already exists, respond accordingly
        if (exist) {
            res.status(200).json({
                message: "Conversation already exists"
            });
            return;
        }

        // If the conversation does not exist, set up a new conversation between them
        const newconversation = new conversationschema({
            members: [senderid, receiverid]
        });

        try {
            // Save the new conversation
            const savedConversation = await newconversation.save();
            res.status(200).json(savedConversation);
        } catch (error) {
            res.status(500).json(error);
        }

    } catch (err) {
        res.status(500).json(err.message);
    }
};

// Controller to get a conversation between two users
exports.getconversation = async (req, res) => {
    try {
        // Extract sender and receiver IDs from the request body
        const senderid = req.body.senderid;
        const receiverid = req.body.receiverid;

        // Find the conversation between the specified members
        let conversation = await conversationschema.findOne({ members: { $all: [senderid, receiverid] } });

        res.status(200).json(conversation);

    } catch (err) {
        res.status(500).json(err);
    }
};
