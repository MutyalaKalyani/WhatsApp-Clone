const mongoose = require('mongoose');

// Define the schema for the user demo
const userdemoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Make the name field required
    },
    email: {
        type: String,
        required: true // Make the email field required
    },
    phonenumber: {
        type: String,
        required: true // Make the phone number field required
    },
    password: {
        type: String,
        required: true // Make the password field required
    },
    picture: {
        type: String,
    },
    sub: {
        type: String,
    },
});

// Middleware to set 'sub' field equal to 'email' field before saving the document
userdemoSchema.pre('save', function () {
    // Check if 'sub' field is not already set
    if (!this.sub) {
        // Set 'sub' field equal to 'email' field
        this.sub = this.email;
    }
    // next(); // This line seems to be commented out, you may uncomment it if needed
});

// Create a model based on the schema
const Userdemo = mongoose.model('Userdemo', userdemoSchema);

// Export the user demo model
module.exports = Userdemo;
