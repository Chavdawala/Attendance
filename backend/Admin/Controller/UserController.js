
// Save User Data (Grouped by Department)
const UserDetails = require('../Models/UserSchema');

// Save User Data (Grouped by Department)
const saveUser = async (req, res) => {
  try {
    const { department, user , email} = req.body; 

 
    const newData = {
      department,
      users: [user],
      email
       // Initialize the users array with the provided user
    };

    // Use insertOne to add the new document
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

// Fetch Users by Department
const getUsersByDepartment = async (req, res) => {
  try {
    const { department } = req.params; 
    const departmentData = await UserDetails.findOne({ department }); 
    if (!departmentData) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(departmentData.users); 
  } catch (error) {
    console.error("Error fetching department data:", error.message);
    res.status(500).json({ error: 'Error fetching department data', details: error.message });
  }
};

// Fetch a Single User by ID within a Department
const getUserById = async (req, res) => {
  try {
    const { department, userId } = req.params; 
    const departmentData = await UserDetails.findOne({ department }); 
    if (!departmentData) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const user = departmentData.users.id(userId);
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
  getUsersByDepartment,
  getUserById,
};
