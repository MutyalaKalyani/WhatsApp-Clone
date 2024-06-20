const express = require("express");
const route = express.Router();

const getusers = require("./controllers/getusers"); // Route to fetch user contacts.
const { setconversation, getconversation } = require("./controllers/conversationcontroller"); // Routes for conversation management.
const { sendmessage, getmessage } = require("./controllers/messagecontroller"); // Routes for sending and fetching messages.
const { signin, signup, forgottenpassword } = require("./controllers/Auth_v2"); // Authentication routes.
const {sendotp}=require("./controllers/sendotp");

// Route to get user contacts
route.get("/getuser", getusers);

// Routes for managing conversations
route.post("/conversation/add", setconversation); // Add a conversation
route.post("/conversation/get", getconversation); // Get conversation details

// Routes for sending and fetching messages
route.post("/message/add", sendmessage); // Send a message
route.get("/message/get/:id", getmessage); // Get messages by conversation ID

// Authentication routes for version 2
route.post("/signup", signup); // User signup
route.post("/signin", signin); // User signin
route.post("/forgottenpassword", forgottenpassword); // Forgotten password recovery
route.post("/sendotp",sendotp);

module.exports = route;
