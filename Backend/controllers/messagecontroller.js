// Import the Message and Conversation schemas
const Message = require("../models/mesaagechatschema");
const Conversation = require("../models/conversationschema");

// Controller to send a message
exports.sendmessage = async (request, response) => {
    const message = new Message(request.body); // Create a new Message instance with the request body

    try {
        await message.save(); // Save the message to the database

        // Update the conversation database with the last message
        await Conversation.findByIdAndUpdate(request.body.conversationid, { message: request.body.text });

        // Respond with success message
        response.status(200).json("Message has been sent successfully");
    } catch (error) {
        // Handle errors and respond with an error status
        response.status(500).json(error);
    }
}

// Controller to get messages by conversation id
exports.getmessage = async (request, response) => {
    try {
        // Retrieve messages from the Message collection based on the conversation id
        const messages = await Message.find({ conversationid: request.params.id });

        // Respond with the retrieved messages
        response.status(200).json(messages);
    } catch (error) {
        // Handle errors and respond with an error status
        response.status(500).json(error);
    }
}
