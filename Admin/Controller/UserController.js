const UserDetails = require('../Models/UserSchema');

// Save User Data (Grouped by Department)
const saveUser = async (req, res) => {
  try {
    const { department, email, firstname, lastname, Birthdate, City, secondemail, phone, jobtype, joinDate, internshipDuration, contractDuration, endDate, shift, startTime, endTime } = req.body;

    // Validate email to avoid duplicate key errors
    if (!email || email.trim() === '') {
      return res.status(400).json({ error: "Email is required." });
    }

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

    const existingDepartment = await UserDetails.findOne({ department });

    if (existingDepartment) {
      // Check if user already exists
      const userExists = existingDepartment.users.some(user => user.email === email);
      
      if (userExists) {
        return res.status(400).json({ error: "User with this email already exists in this department." });
      }

      // Add new user to the existing department
      existingDepartment.users.push(user);
      await existingDepartment.save();
      return res.status(200).json({ message: "User added successfully!", user });
    }

    // If department does not exist, create a new one
    const newData = new UserDetails({ department, users: [user] });
    await newData.save();

    res.status(200).json({ message: "User saved successfully!", newData });
  } catch (error) {
    console.error("Error saving user data:", error.message);
    res.status(500).json({ error: "Error saving user data", details: error.message });
  }
};

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const data = await UserDetails.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users", details: error.message });
  }
};

// Update User Data
const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const updatedData = req.body;

    if (!email || email.trim() === '') {
      return res.status(400).json({ message: "Invalid email provided." });
    }

    const user = await UserDetails.findOneAndUpdate(
      { "users.email": email }, 
      { $set: { "users.$": updatedData } }, 
      { new: true }
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
  try {
    const { email } = req.params;

    console.log("Received delete request for email:", email);

    if (!email || email.trim() === '' || email === "null") {
      return res.status(400).json({ message: "Invalid email provided." });
    }

    // Find the document and filter out any users with null email values
    const result = await UserDetails.findOneAndUpdate(
      { "users.email": email },
      { 
        $pull: { users: { email: email } } 
      },
      { new: true }
    );

    if (!result) {
      console.log("User not found in database.");
      return res.status(404).json({ message: "User not found." });
    }

    // Clean up null emails in case they exist
    await UserDetails.updateMany(
      { "users.email": null },
      { $pull: { users: { email: null } } }
    );

    console.log("User deleted successfully:", email);
    res.status(200).json({ message: "User deleted successfully." });

  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: "Server error.", details: error.message });
  }
};


// Fetch a user by email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email || email.trim() === '') {
      return res.status(400).json({ error: "Invalid email provided." });
    }

    const userData = await UserDetails.findOne(
      { "users.email": email }, 
      { department: 1, "users.$": 1 } 
    );

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ department: userData.department, user: userData.users[0] });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ error: "Error fetching user data", details: error.message });
  }
};

module.exports = {
  saveUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserByEmail,
};
