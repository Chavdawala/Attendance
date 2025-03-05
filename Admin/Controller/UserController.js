const UserDetails = require('../Models/UserSchema');


// Save User Data (Grouped by Department)
const saveUser = async (req, res) => {
  try {
    const { department , email, firstname, lastname, Birthdate, City, secondemail, phone, jobtype, joinDate, internshipDuration, contractDuration, endDate, shift, startTime, endTime } = req.body; 

    const user = {
      firstname,
      email,
      lastname,
      Birthdate,
      City,
      secondemail,
      phone,
      jobtype,
      joinDate,
      internshipDuration,
      contractDuration,
      endDate,
      shift,
      startTime,
      endTime,
    };
    
    const newData = {
      department,
      users: [user],
    };

    const result = await UserDetails.insertMany(newData);

    res.status(200).json({ message: 'User saved successfully!', result });
  } catch (error) {
    console.error("Error saving user data:", error.message);
    res.status(500).json({ error: 'Error saving user data', details: error.message });
  }
};

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const data = await UserDetails.find(); 
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: 'Error fetching users', details: error.message });
  }
};

// Update User Data
const updateUser = async (req, res) => {
  try {
    const { email } = req.params; // Get email from URL
    const updatedData = req.body; // New user data

    const user = await UserDetails.findOneAndUpdate(
      { "users.email": email }, // Find user by email
      { $set: { "users.$": updatedData } }, // Update user data
      { new: true } // Return updated data
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  let { email } = req.params;

  try {
    if (!email || email.trim() === "null") {
      console.log("❌ Invalid email received:", email);
      return res.status(400).json({ message: "Invalid email." });
    }

    email = email.trim().toLowerCase();
    console.log(`🟡 Attempting to delete user with email: ${email}`);

    const existingUser = await UserDetails.findOne({ "users.email": email });

    if (!existingUser) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ message: "User not found." });
    }

    console.log("✅ Found user, proceeding with deletion...");

    // Ensure the user exists in the array before trying to pull
    const userExistsInArray = existingUser.users.some(user => user.email === email);
    if (!userExistsInArray) {
      console.log("❌ Email not found in users array:", email);
      return res.status(404).json({ message: "User email not found in record." });
    }

    // Remove the user from the array
    const updatedDoc = await UserDetails.findOneAndUpdate(
      { _id: existingUser._id },
      { $pull: { users: { email } } },
      { new: true }
    );

    if (!updatedDoc) {
      console.log("❌ Failed to delete user:", email);
      return res.status(500).json({ message: "User deletion failed." });
    }

    // If no users left in department, delete the document
    if (updatedDoc.users.length === 0) {
      console.log("🗑 No users left, deleting document...");
      await UserDetails.deleteOne({ _id: existingUser._id });
    }

    console.log("✅ User deleted successfully:", email);
    res.status(200).json({ message: "User deleted successfully." });

  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};




// Fetch a user by email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params; // Get email from request params

    // Find the user along with the department
    const userData = await UserDetails.findOne(
      { "users.email": email }, 
      { department: 1, "users.$": 1 } // Include department in the response
    );

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return both department and user details
    res.status(200).json({ department: userData.department, user: userData.users[0] });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ error: 'Error fetching user data', details: error.message });
  }
};


module.exports = {
  saveUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserByEmail, // Export 
};
