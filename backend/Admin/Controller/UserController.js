const User = require('../Models/UserSchema'); // Import the updated User schema

// Save User Data (without name and password requirement)
const saveUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log incoming data for debugging

    // Create a new user with the received data
    const newUser = new User(req.body);
    await newUser.save(); // Save the user to the database

    res.status(200).json({ message: 'User saved successfully!' });
  } catch (error) {
    console.error("Error saving user data:", error.message);
    res.status(500).json({ error: 'Error saving user data', details: error.message });
  }
};

// Fetch All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: 'Error fetching users', details: error.message });
  }
};

// Fetch a Single User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: 'Error fetching user', details: error.message });
  }
};

module.exports = {
  saveUser, 
  getUsers,
  getUserById,
};
