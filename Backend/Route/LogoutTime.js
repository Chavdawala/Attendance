const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Modules/User'); // Your User model
const router = express.Router();

// POST: Store logout time for an existing user

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
router.post("/logout", async (req, res) => {
    const { email, name, latitude, longitude, logoutTime } = req.body;  

    if (!email || !name || !latitude || !longitude || !logoutTime) {
        return res.status(400).json({
            message: "All fields (logoutTime, email, name, latitude, longitude) are required.",
        });
    }

    if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ message: "Invalid email provided." });
    }

    if (!isWithinRange(latitude, longitude)) {
        return res.status(403).json({
          message: "You are not within the allowed location range (100m).",
        });
      }
      
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.logoutTimes.push({
            time: logoutTime, 
            latitude: latitude.toString(),
            longitude: longitude.toString(),
        });

        const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "5h" });

        await user.save();
        
        res.status(200).json({
            message: "Logout time and location stored successfully.",
            user: {
                name: user.name,
                email: user.email,
                logoutTimes: user.logoutTimes,  
            },
            authToken: authToken,
        });

    } catch (error) {
        console.error("Error storing logout time:", error);
        res.status(500).json({ message: "Internal Server Error.", error: error.message });
    }
});


//fetch attendance at employee side
router.get('/logout', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        console.log(`Fetching logout records for email: ${email}`);

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found in database.');
            return res.status(404).json({ message: 'User not found.' });
        }

        // If user has no logout records
        if (!user.logoutTimes || user.logoutTimes.length === 0) {
            console.log('No logout records found for this user.');
            return res.status(200).json({ message: 'No logout records found.', records: [] });
        }

        console.log(`Logout records found: ${JSON.stringify(user.logoutTimes)}`);

        res.status(200).json({
            message: 'Logout records fetched successfully',
            email: user.email,
            records: user.logoutTimes,
        });
    } catch (error) {
        console.error('Error fetching logout records:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

//show logout attendance at admin side
router.get("/logoutTimes", async (req, res) => {
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
