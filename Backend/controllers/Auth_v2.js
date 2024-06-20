// Import required modules
const Userdemo = require("../models/userschemaauth-v2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup controller
exports.signup = async (req, res) => {
    try {
        // Extract user data from the request body
        const { name, email, phonenumber, password } = req.body;

        // Check if the user already exists
        const existingUser = await Userdemo.findOne({ email });
        if (existingUser) {
            res.status(203).json("User already exists. Please sign in to continue.");
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const user = await Userdemo.create({
            name,
            email,
            phonenumber,
            password: hashedPassword,
        });

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User signup failed. Please try again.",
        });
    }
};

// Signin controller
exports.signin = async (req, res) => {
    try {
        // Get email and password from the request body
        const { email, password } = req.body;

        // Find user with provided email
        const user = await Userdemo.findOne({ email });

        // If user not found with provided email
        if (!user) {
            res.status(203).json("User with this email is not registered!");
            return;
        } else {
            // Compare the password
            bcrypt.compare(password, user.password)
                .then((result) => {
                    if (result) {
                        res.status(200).json(user); // Passwords match
                        return;
                    } else {
                        res.status(203).json("Password does not match"); // Passwords do not match
                        return;
                    }
                })
                .catch((error) => {
                    console.error('Error comparing passwords:', error);
                });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Login failure. Please try again.`,
        });
    }
};

// Forgotten password controller
exports.forgottenpassword = async (req, res) => {
    try {
        const { password, email } = req.body;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await Userdemo.findOneAndUpdate(
            { email: email },
            { password: hashedPassword },
            { new: true }
        );

        res.json({
            success: true,
            message: `Password change successful`,
        });
    } catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some error in changing the password`,
        });
    }
};
