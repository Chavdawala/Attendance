const express = require("express");
const User = require("../models/User"); // Assuming you have a User model
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); // Add mongoose import
const router = express.Router();

// Secret key for JWT (replace with your secure secret key, use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// POST: Store loginTime for an existing user and generate JWT
router.post("/user", async (req, res) => {
  const { loginTime, email, name, latitude, longitude } = req.body;

  // Validate that all required fields are present
  if (!loginTime || !email || !name || !latitude || !longitude) {
    return res
      .status(400)
      .json({
        message:
          "All fields (loginTime, email, name, latitude, longitude) are required.",
      });
  }

  // Check if email is a valid string
  if (typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({ message: "Invalid email provided." });
  }

  try {
    // Check if the user exists by email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Validate and add the new login time with latitude and longitude
    const newLoginTime = new Date(loginTime); // User's provided time
    const offset = 5.5 * 60; // IST is UTC+5:30
    const istTime = new Date(newLoginTime.getTime() + offset * 60000); // Adjust time to IST

    // Add the new login entry with latitude and longitude
    user.loginTimes.push({
      time: istTime, // Store the time in IST
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    });

    // Generate a JWT for the user
    const tokenPayload = {
      id: user._id, // Include user ID in the token
      email: user.email, // Include email for reference
    };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "5h" }); // Token valid for 5 hours

    // Save the updated user document
    await user.save();

    // Respond with the user's name, email, token, and updated login times
    res.status(200).json({
      message: "Login time and location stored successfully.",
      user: {
        name: user.name,
        email: user.email,
        loginTimes: user.loginTimes,
      },
      authToken: token, // Return the generated JWT
    });
  } catch (error) {
    console.error("Error storing login time:", error);
    if (error.name === "MongoError" && error.code === 11000) {
      return res.status(400).json({ message: "Email is already taken." });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error.", error: error.message });
  }
});

router.get("/user", async (req, res) => {
  try {
    console.log("Received request for /api/user");

    // Check if the database connection is active
    if (!mongoose.connection.readyState) {
      throw new Error("Database connection is not established");
    }

    // Fetch data from the database
    const users = await User.find();
    console.log("Fetched users:", users);

    // Ensure all necessary fields are present and valid
    users.forEach((user) => {
      if (!user.email || typeof user.email !== "string") {
        console.warn(`Invalid email found for user ${user._id}:`, user.email);
      }
      if (!user.name || typeof user.name !== "string") {
        console.warn(`Invalid name found for user ${user._id}:`, user.name);
      }

      // Ensure loginTimes is an array
      if (!Array.isArray(user.loginTimes)) {
        user.loginTimes = []; // Initialize as an empty array
        console.warn(   
          `Invalid loginTimes for user ${user._id}:`,
          user.loginTimes
        );
      }
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error in /api/user route:");
    console.error("Message:", error.message);
    console.error("Stack trace:", error.stack);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
