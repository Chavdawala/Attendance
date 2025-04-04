const express = require("express");
const User = require("../Modules/User"); // Assuming you have a User model
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); // Add mongoose import
const router = express.Router();

// Secret key for JWT (replace with your secure secret key, use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

//location 
const isWithinRange = (lat, lon) => {
  const targetLat = 22.318191;
  const targetLon = 73.187403;
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat * Math.PI) / 180;
  const φ2 = (targetLat * Math.PI) / 180;
  const Δφ = ((targetLat - lat) * Math.PI) / 180;
  const Δλ = ((targetLon - lon) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; 

  if (distance <= 100){
    return "You are in Career Naksha Office Range .";
  } 
};

// POST: Store loginTime for an existing user and generate JWT
router.post("/user", async (req, res) => {
  const { email, name, latitude, longitude } = req.body;

  // Validate that all required fields are present
  if (!email || !name || !latitude || !longitude) {
    return res
      .status(400)
      .json({
        message:
          "All fields (loginTime, email, name, latitude, longitude) are required.",
      });
  }

  const locationName = isWithinRange(latitude, longitude);
  if (!isWithinRange(latitude, longitude)) {
    return res.status(403).json({
      message: "You are not within the allowed location range (100m).",
    });
  }

  // Check if email is a valid string
  if (typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({ message: "Invalid email provided." });
  }

  try {
    
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.loginTimes.push({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      locationName,
    });

    const tokenPayload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "5h" });

    await user.save();

    res.status(200).json({
      message: "Login time and location stored successfully.",
      user: {
        name: user.name,
        email: user.email,
        loginTimes: user.loginTimes,
      },
      authToken: token, 
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

// Fetch attendance for employee side (single user)
router.get("/user/", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Fetch user by email
    const user = await User.findOne({ email: email.trim() });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Extract loginTimes for the current month (if needed)
    const currentMonth = new Date().getMonth();
    const filteredLoginTimes = user.loginTimes.filter((entry) => {
      const entryDate = new Date(entry.time);
      return entryDate.getMonth() === currentMonth;
    });

    res.status(200).json({
      message: "Attendance records fetched successfully.",
      email: user.email,
      records: filteredLoginTimes,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return res.status(500).json({ message: "Server error occurred." });
  }
});

// Fetch attendance for admin side (all users)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    const allRecords = users.map((user) => {
      // Extract loginTimes for the current month (if needed)
      const currentMonth = new Date().getMonth();
      const filteredLoginTimes = user.loginTimes.filter((entry) => {
        const entryDate = new Date(entry.time);
        return entryDate.getMonth() === currentMonth;
      });

      
      return {
        data: users,
        email: user.email,
        records: filteredLoginTimes,
      };
    });


    res.status(200).json({
      message: "All users' attendance records fetched successfully.",
      users: allRecords,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Server error occurred." });
  }
});

module.exports = router;